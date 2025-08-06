// src/pages/AboutPage.jsx
import { useState } from 'react';
import UnderDevelopmentModal from '../components/UnderDevelopmentModal';

export default function AboutPage() {
  const [showModal, setShowModal] = useState(false);

  const teamMembers = [
    {
      name: 'Nguyễn Văn A',
      role: 'Giám đốc điều hành',
      image:
        'https://res.cloudinary.com/dl9kkwfyw/image/upload/v1752185549/bigstock-Happy-Young-Woman-Talking-On-H-131050574_uzjqkl.jpg',
    },
    {
      name: 'Trần Thị B',
      role: 'Trưởng phòng học thuật',
      image:
        'https://res.cloudinary.com/dl9kkwfyw/image/upload/v1752186162/tieng-anh-nguoi-lon-3_um85zq.jpg',
    },
    {
      name: 'Lê Văn C',
      role: 'Phát triển sản phẩm',
      image:
        'https://res.cloudinary.com/dl9kkwfyw/image/upload/v1752186258/tieng-anh-du-lich-1_sxsyy0.jpg',
    },
    {
      name: 'Phạm Thị D',
      role: 'Chuyên gia ngôn ngữ',
      image:
        'https://res.cloudinary.com/dl9kkwfyw/image/upload/v1752186051/h%E1%BB%8Dc-TA-qua-phim-c%C3%B3-ph%E1%BB%A5-%C4%91%E1%BB%811-01_bfbnqu.jpg',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Về Chúng Tôi</h1>
          <p className="text-lg md:text-xl leading-relaxed">
            Antoree là nền tảng học tiếng Anh hiện đại, tập trung vào giao tiếp thực tế, luyện 4 kỹ năng với giáo viên bản ngữ và chuyên gia ngôn ngữ.
          </p>
        </div>
      </section>

      {/* Sứ mệnh */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Sứ mệnh của chúng tôi</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Chúng tôi tin rằng học tiếng Anh không chỉ là ngữ pháp hay từ vựng, mà là học cách tư duy, giao tiếp tự tin trong môi trường toàn cầu.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Với đội ngũ giáo viên và chuyên gia giàu kinh nghiệm, chúng tôi mang đến các khóa học phù hợp với mọi độ tuổi và mục tiêu học tập.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105">
            <img
              src="https://res.cloudinary.com/dl9kkwfyw/image/upload/v1752186258/tieng-anh-du-lich-1_sxsyy0.jpg"
              alt="Khóa học"
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Đội ngũ */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            Đội ngũ của chúng tôi
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-green-600 mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Modal */}
      <section className="bg-gradient-to-r from-green-50 via-white to-green-100 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Tại sao chọn Antoree?</h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            Với phương pháp học hiện đại, linh hoạt và cá nhân hóa, Antoree giúp bạn tiến bộ nhanh chóng, không áp lực và thực sự yêu thích việc học tiếng Anh.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-full transition duration-300 shadow-md hover:shadow-lg"
          >
            Khám phá thêm
          </button>
        </div>
      </section>

      {/* Modal */}
      <UnderDevelopmentModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
