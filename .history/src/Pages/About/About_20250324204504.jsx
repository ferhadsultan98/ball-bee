// src/Pages/About/About.jsx
import React from 'react';
import './About.scss';
import honeyJar from "../../assets/honey-jar.png"

const About = () => {
  return (
    <div className="about">
      <div className="about-container">
        <h1 className="about-title">Haqqımızda</h1>
        <div className="about-content">
          <div className="about-text">
            <h2>Ball-Bee: Təbii Balın Ünvanı</h2>
            <p>
              Ball-Bee olaraq, biz təbiətin ən saf və şəfalı neməti olan balı sizə təqdim edirik. Ən yaxşı arıçıların əməyi ilə toplanan balımız, heç bir əlavə qatqı olmadan, tamamilə təbii şəkildə istehsal olunur. Bizim missiyamız, sağlam həyat tərzini dəstəkləmək və təbiətin bu möcüzəsini hər kəsə çatdırmaqdır.
            </p>
            <h3>Balın Faydaları</h3>
            <ul className="benefits-list">
              <li><strong>Enerji Mənbəyi:</strong> Təbii şəkərlər sayəsində gün ərzində enerji verir.</li>
              <li><strong>İmmuniteti Gücləndirir:</strong> Antioksidantlarla zəngindir, xəstəliklərə qarşı qoruyur.</li>
              <li><strong>Yaraların Sağalması:</strong> Antibakterial xüsusiyyətləri ilə yaraların sağalmasını sürətləndirir.</li>
              <li><strong>Həzmi Yaxşılaşdırır:</strong> Mədə-bağırsaq sistemini dəstəkləyir.</li>
              <li><strong>Dəri Sağlamlığı:</strong> Təbii nəmləndirici olaraq dəri sağlamlığını dəstəkləyir.</li>
            </ul>
          </div>
          <div className="about-image">
            <img src={honeyJar} alt="Honey Jar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;