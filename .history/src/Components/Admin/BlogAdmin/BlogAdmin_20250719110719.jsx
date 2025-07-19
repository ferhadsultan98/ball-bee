import React, { useState, useEffect, useMemo } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { db, ref, set, onValue, update, remove } from '../../../Firebase/Firebase';
import './BlogAdmin.scss';

const BlogAdmin = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: { en: '', az: '', ru: '' },
    excerpt: { en: '', az: '', ru: '' },
    content: {
      en: [{ type: 'paragraph', children: [{ text: '' }] }],
      az: [{ type: 'paragraph', children: [{ text: '' }] }],
      ru: [{ type: 'paragraph', children: [{ text: '' }] }],
    },
    image: null,
    hashtags: '',
    author: '',
  });
  const [editingPost, setEditingPost] = useState(null);
  const [error, setError] = useState('');

  const editorEn = useMemo(() => withReact(createEditor()), []);
  const editorAz = useMemo(() => withReact(createEditor()), []);
  const editorRu = useMemo(() => withReact(createEditor()), []);

  useEffect(() => {
    const postsRef = ref(db, 'blogPosts');
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const postsArray = Object.keys(data).map((key) => {
          const post = data[key];
          // Ensure content is in valid Slate.js format
          return {
            id: key,
            ...post,
            content: {
              en: post.content?.en && Array.isArray(post.content.en)
                ? post.content.en
                : [{ type: 'paragraph', children: [{ text: '' }] }],
              az: post.content?.az && Array.isArray(post.content.az)
                ? post.content.az
                : [{ type: 'paragraph', children: [{ text: '' }] }],
              ru: post.content?.ru && Array.isArray(post.content.ru)
                ? post.content.ru
                : [{ type: 'paragraph', children: [{ text: '' }] }],
            },
          };
        });
        setBlogPosts(postsArray);
      } else {
        setBlogPosts([]);
      }
    });
  }, []);

  const handleInputChange = (e, lang) => {
    const { name, value } = e.target;
    if (name === 'image') {
      if (editingPost) {
        setEditingPost({ ...editingPost, image: e.target.files[0] });
      } else {
        setNewPost({ ...newPost, image: e.target.files[0] });
      }
    } else if (name === 'hashtags' || name === 'author') {
      if (editingPost) {
        setEditingPost({ ...editingPost, [name]: value });
      } else {
        setNewPost({ ...newPost, [name]: value });
      }
    } else {
      if (editingPost) {
        setEditingPost({
          ...editingPost,
          [name]: { ...editingPost[name], [lang]: value },
        });
      } else {
        setNewPost({
          ...newPost,
          [name]: { ...newPost[name], [lang]: value },
        });
      }
    }
  };

  const handleEditorChange = (value, name, lang) => {
    if (editingPost) {
      setEditingPost({
        ...editingPost,
        [name]: { ...editingPost[name], [lang]: value },
      });
    } else {
      setNewPost({
        ...newPost,
        [name]: { ...newPost[name], [lang]: value },
      });
    }
  };

  const addPost = async (e) => {
    e.preventDefault();
    if (
      !newPost.title.en ||
      !newPost.excerpt.en ||
      !newPost.content.en[0].children[0].text ||
      !newPost.image
    ) {
      setError('Tüm İngilizce alanlar ve resim gereklidir.');
      return;
    }
    try {
      const postId = Date.now().toString();
      const imageUrl = await uploadImage(newPost.image);
      await set(ref(db, `blogPosts/${postId}`), {
        ...newPost,
        id: postId,
        date: new Date().toISOString().split('T')[0],
        image: imageUrl,
      });
      setNewPost({
        title: { en: '', az: '', ru: '' },
        excerpt: { en: '', az: '', ru: '' },
        content: {
          en: [{ type: 'paragraph', children: [{ text: '' }] }],
          az: [{ type: 'paragraph', children: [{ text: '' }] }],
          ru: [{ type: 'paragraph', children: [{ text: '' }] }],
        },
        image: null,
        hashtags: '',
        author: '',
      });
      setError('');
    } catch (err) {
      setError('Yazı eklenemedi.');
    }
  };

  const updatePost = async (e) => {
    e.preventDefault();
    if (
      !editingPost.title.en ||
      !editingPost.excerpt.en ||
      !editingPost.content.en[0].children[0].text
    ) {
      setError('Tüm İngilizce alanlar gereklidir.');
      return;
    }
    try {
      const imageUrl = editingPost.image instanceof File ? await uploadImage(editingPost.image) : editingPost.image;
      await update(ref(db, `blogPosts/${editingPost.id}`), {
        ...editingPost,
        image: imageUrl,
      });
      setEditingPost(null);
      setError('');
    } catch (err) {
      setError('Yazı güncellenemedi.');
    }
  };

  const uploadImage = async (file) => {
    // Firebase Storage için yer tutucu (örnek)
    return URL.createObjectURL(file); // Geçici yerel URL
  };

  const deletePost = async (postId) => {
    try {
      await remove(ref(db, `blogPosts/${postId}`));
    } catch (err) {
      setError('Yazı silinemedi.');
    }
  };

  const startEditing = (post) => {
    setEditingPost({
      ...post,
      content: {
        en: post.content?.en && Array.isArray(post.content.en)
          ? post.content.en
          : [{ type: 'paragraph', children: [{ text: '' }] }],
        az: post.content?.az && Array.isArray(post.content.az)
          ? post.content.az
          : [{ type: 'paragraph', children: [{ text: '' }] }],
        ru: post.content?.ru && Array.isArray(post.content.ru)
          ? post.content.ru
          : [{ type: 'paragraph', children: [{ text: '' }] }],
      },
    });
    setError('');
  };

  return (
    <div className="blogAdmin">
      <div className="adminSection">
        <div className="adminContainer">
          <h1 className="sectionTitle">Blog Yönetim Paneli</h1>
          {error && <div className="errorMessage">{error}</div>}

          <form className="adminForm" onSubmit={editingPost ? updatePost : addPost}>
            {['en', 'az', 'ru'].map((lang) => (
              <div key={lang} className="languageSection">
                <h2>{lang.toUpperCase()}</h2>
                <div className="formGroup">
                  <label>Başlık ({lang})</label>
                  <input
                    type="text"
                    name="title"
                    value={editingPost ? editingPost.title[lang] : newPost.title[lang]}
                    onChange={(e) => handleInputChange(e, lang)}
                    placeholder={`Yazı başlığını girin (${lang})`}
                  />
                </div>
                <div className="formGroup">
                  <label>Özet ({lang})</label>
                  <textarea
                    name="excerpt"
                    value={editingPost ? editingPost.excerpt[lang] : newPost.excerpt[lang]}
                    onChange={(e) => handleInputChange(e, lang)}
                    placeholder={`Yazı özetini girin (${lang})`}
                  />
                </div>
                <div className="formGroup">
                  <label>İçerik ({lang})</label>
                  <Slate
                    editor={lang === 'en' ? editorEn : lang === 'az' ? editorAz : editorRu}
                    value={editingPost ? editingPost.content[lang] : newPost.content[lang]}
                    onChange={(value) => handleEditorChange(value, 'content', lang)}
                  >
                    <Editable
                      style={{ minHeight: '300px', border: '1px solid #ccc', padding: '10px' }}
                      placeholder={`İçeriği girin (${lang})`}
                    />
                  </Slate>
                </div>
              </div>
            ))}
            <div className="formGroup">
              <label>Resim</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="formGroup">
              <label>Etiketler</label>
              <input
                type="text"
                name="hashtags"
                value={editingPost ? editingPost.hashtags : newPost.hashtags}
                onChange={(e) => handleInputChange(e)}
                placeholder="Etiketleri girin (örn. #teknoloji #blog)"
              />
            </div>
            <div className="formGroup">
              <label>Yazar</label>
              <input
                type="text"
                name="author"
                value={editingPost ? editingPost.author : newPost.author}
                onChange={(e) => handleInputChange(e)}
                placeholder="Yazar adını girin"
              />
            </div>
            <button type="submit" className="submitButton">
              {editingPost ? 'Yazıyı Güncelle' : 'Yazı Ekle'}
            </button>
            {editingPost && (
              <button
                type="button"
                className="cancelButton"
                onClick={() => setEditingPost(null)}
              >
                İptal
              </button>
            )}
          </form>

          <div className="postsList">
            {blogPosts.map((post) => (
              <div key={post.id} className="postItem">
                <div className="postImage">
                  <img src={post.image} alt={post.title.en} />
                </div>
                <div className="postDetails">
                  <h3>{post.title.en}</h3>
                  <p>{post.excerpt.en}</p>
                  <div className="postMeta">
                    <span>{post.date}</span> | <span>{post.author}</span> |{' '}
                    <span>{post.hashtags}</span>
                  </div>
                  <div className="postActions">
                    <button
                      className="editButton"
                      onClick={() => startEditing(post)}
                    >
                      Düzenle
                    </button>
                    <button
                      className="deleteButton"
                      onClick={() => deletePost(post.id)}
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;