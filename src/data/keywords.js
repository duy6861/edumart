// src/data/keywords.js
export const keywordGroups = [
  {
    intent: 'giao_tiep',
    keywords: /giao tiep|noi|hoi thoai|conversation|speaking|phan xa|tinh huong|tu tin noi|dam thoai|giao tiep hang ngay|giao tiep cong viec|tro chuyen/i,
    productIds: [1, 3, 21, 22, 24, 30, 31, 32, 38],
    replies: [
      "Bạn muốn cải thiện kỹ năng giao tiếp tiếng Anh à? Mình có một số khóa học giúp bạn tự tin nói chuyện trong công việc và đời sống.",
      "Nếu bạn muốn nói tiếng Anh lưu loát, hãy thử các khóa học sau đây nhé!",
      "Các khóa học này sẽ giúp bạn phản xạ nhanh hơn khi giao tiếp hàng ngày."
    ]
  },
  {
    intent: 'nghe',
    keywords: /nghe|listening|hoi thoai|bai nghe|hieu|tap nghe|tap hieu|nghe hieu|nghe dai|podcast|radio|tivi|phim/i,
    productIds: [2, 13, 34],
    replies: [
      "Luyện nghe là nền tảng quan trọng. Mình gợi ý một số khóa học có bài nghe thực tế từ phim, podcast và hội thoại.",
      "Bạn cần luyện nghe từ cơ bản đến nâng cao? Đây là những khóa phù hợp!"
    ]
  },
  {
    intent: 'co_ban',
    keywords: /co ban|mat goc|moi bat dau|beginner|starter|so cap|tu dau|tu hoc|co ban nhat|hoc tu 0|chua biet gi|khoi dau/i,
    productIds: [1, 4, 6, 16, 39, 40],
    replies: [
      "Đừng lo! Mình có những khóa học dành riêng cho người mới bắt đầu, kể cả khi bạn chưa biết gì về tiếng Anh.",
      "Hãy bắt đầu từ nền tảng vững chắc. Những khóa học này sẽ giúp bạn tiến bộ từng ngày!"
    ]
  },
  {
    intent: 'toeic',
    keywords: /toeic|ielts|toefl|thi|chung chi|test|exam|writing|reading|speaking|listening|luyen thi|diem cao|900|7.0|band 7|cambridge|ket|pet|fce|cae/i,
    productIds: [7, 9, 13, 15, 17, 29, 37],
    replies: [
      "Bạn đang chuẩn bị cho kỳ thi TOEIC hoặc IELTS? Mình có các khóa luyện thi chuyên sâu giúp bạn đạt điểm cao.",
      "Các khóa học này bao gồm đề thi thật, chiến lược làm bài và luyện từng kỹ năng."
    ]
  },
  {
    intent: 'phat_am',
    keywords: /phat am|pronunciation|giong|accent|ngu dieu|intonation|nghe - noi|giong ban xu|giong My|giong Anh|giong Anh - My/i,
    productIds: [5, 27],
    replies: [
      "Muốn nói tiếng Anh như người bản xứ? Hãy thử khóa học phát âm chuẩn giọng Mỹ hoặc Anh.",
      "Luyện phát âm giúp bạn tự tin hơn khi nói chuyện và được hiểu rõ hơn."
    ]
  },
  {
    intent: 'viet',
    keywords: /viet|writing|email|bai luan|essay|task|academic|viet thu|viet email cong viec|viet IELTS|viet TOEIC|viet hoc thuat/i,
    productIds: [6, 11, 17, 23, 33],
    replies: [
      "Viết tiếng Anh đúng ngữ pháp và tự nhiên rất quan trọng. Mình gợi ý các khóa học giúp bạn viết email, bài luận và bài thi hiệu quả.",
      "Bạn cần học cách viết học thuật hay email công việc? Đây là lựa chọn tốt!"
    ]
  },
  {
    intent: 'chuyen_nganh',
    keywords: /chuyen nganh|y te|kinh doanh|luat|it|ky thuat|engineering|medical|business|legal|tech|nursing|doctor|sales|marketing|project management|software|developer|engineer/i,
    productIds: [3, 10, 12, 25, 26, 35, 36],
    replies: [
      "Bạn làm trong ngành y tế, IT hay kinh doanh? Có những khóa học tiếng Anh chuyên ngành dành riêng cho bạn!",
      "Giao tiếp trong công việc sẽ dễ dàng hơn với từ vựng và mẫu câu chuyên ngành."
    ]
  },
  {
    intent: 'tre_em',
    keywords: /tre em|kids|du lich|phim|co tich|story|truyen|doc truyen|phim hoat hinh|cartoon|animated|nursery rhyme|abc|hoc qua phim|tieng Anh cho be/i,
    productIds: [8, 14, 19, 40],
    replies: [
      "Tiếng Anh qua phim hoạt hình và truyện cổ tích rất hiệu quả cho trẻ em!",
      "Học tiếng Anh qua phim và truyện giúp bé hứng thú và ghi nhớ lâu hơn."
    ]
  },
  {
    intent: 'dinh_cu',
    keywords: /dinh cu|hang ngay|sinh hoat|daily life|life skill|du hoc|di lam|giao tiep gia dinh|nau an|mua sam|benh vien|truong hoc|di xe bus|dat phong|dat ve/i,
    productIds: [18, 20, 28],
    replies: [
      "Nếu bạn chuẩn bị du học hoặc định cư, hãy học tiếng Anh sinh hoạt hàng ngày để tự tin hơn!",
      "Các khóa học này giúp bạn giao tiếp trong siêu thị, bệnh viện, trường học và nhiều tình huống thực tế."
    ]
  },
  {
    intent: 'tu_vung',
    keywords: /tu vung|vocabulary|word|tu moi|hoc tu|hoc 1000 tu|hoc 500 tu|tu co ban|tu theo chu de|collocation|idiom|thanh ngu|cum tu/i,
    productIds: [4, 11, 21, 25, 31],
    replies: [
      "Mở rộng vốn từ vựng là chìa khóa để nói và viết tốt hơn. Mình có các khóa học theo chủ đề giúp bạn học từ hiệu quả.",
      "Học từ vựng qua hình ảnh, ví dụ và bài tập sẽ giúp bạn nhớ lâu hơn!"
    ]
  },
  {
    intent: 'online',
    keywords: /online|hoc online|hoc truc tuyen|hoc qua mang|hoc o nha|hoc qua zoom|hoc 1 kem 1|hoc voi giao vien|giao vien nuoc ngoai/i,
    productIds: [5, 7, 9, 15, 27, 37],
    replies: [
      "Bạn muốn học trực tuyến với giáo viên bản xứ? Mình có nhiều khóa học 1 kèm 1 chất lượng cao!",
      "Học online linh hoạt, tiết kiệm thời gian và hiệu quả cao."
    ]
  }
];

export const removeVietnameseTones = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/([đĐ])/g, 'd')
    .replace(/([^0-9a-z-A-Z ])/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};