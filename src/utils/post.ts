export interface Post {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    imageUrl: string;
    slug: string;
    date: string; 
  }
  
  export interface Category {
    id: string;
    name: string;
    slug: string;
    count: number;
  }
  
  
  export const categories: Category[] = [
    { id: '1', name: 'Blog', slug: 'blog', count: 5 },
    { id: '2', name: 'Giải pháp chuyển đổi số', slug: 'giai-phap-chuyen-doi-so', count: 1 },
    { id: '3', name: 'Hệ điều hành linux', slug: 'he-dieu-hanh-linux', count: 1 },
    { id: '4', name: 'Hỗ trợ', slug: 'ho-tro', count: 1 },
    { id: '5', name: 'Marketing', slug: 'marketing', count: 1 },
  ];
  
  export const posts: Post[] = [
    {
      id: '1',
      title: 'Doanh nghiệp "nhẹ gánh" nguồn nhân lực nhờ 4 ứng dụng trong Auto Call',
      excerpt: 'Auto Call hiện đang được rất nhiều doanh nghiệp xem như "trợ thủ" khi ứng...',
      content: 'Auto Call hiện đang được rất nhiều doanh nghiệp xem như "trợ thủ" khi ứng dụng vào hoạt động kinh doanh. Bài viết này sẽ giới thiệu 4 ứng dụng chính của Auto Call giúp doanh nghiệp "nhẹ gánh" nguồn nhân lực...',
      category: 'blog',
      imageUrl: '/assets/Chuyen-doi-so-doanh-nghiep.jpg',
      slug: 'doanh-nghiep-nhe-ganh',
      date: '2023-11-27'
    },
    {
      id: '2',
      title: 'Các hình thức gọi điện VoIP bạn nên biết?',
      excerpt: 'Điện thoại VoIP vốn được biết đến là công nghệ hiện đại hàng đầu hiện nay. Điện...',
      content: 'Điện thoại VoIP vốn được biết đến là công nghệ hiện đại hàng đầu hiện nay. Điện thoại VoIP có nhiều hình thức gọi khác nhau, mỗi hình thức đều có những ưu điểm riêng. Bài viết này sẽ giới thiệu các hình thức gọi điện VoIP phổ biến nhất...',
      category: 'giai-phap-chuyen-doi-so',
      imageUrl: '/assets/Chuyen-doi-so-doanh-nghiep.jpg',
      slug: 'cac-hinh-thuc-goi-dien-voip',
      date: '2023-11-26'
    },
    {
      id: '3',
      title: 'Công nghệ AI: Chọn giới tính giọng nói trợ lý ảo dựa vào đâu?',
      excerpt: 'Giới tính giọng nói của AI là một khía cạnh cần nghiên cứu nghiêm túc...',
      content: 'Giới tính giọng nói của AI là một khía cạnh cần nghiên cứu nghiêm túc trong quá trình phát triển trợ lý ảo. Việc lựa chọn giới tính cho giọng nói AI dựa trên nhiều yếu tố như mục đích sử dụng, đối tượng người dùng, và các yếu tố văn hóa...',
      category: 'marketing',
      imageUrl: '/assets/Chuyen-doi-so-doanh-nghiep.jpg',
      slug: 'cong-nghe-ai-giong-noi',
      date: '2023-11-25'
    },
    {
      id: '4',
      title: 'Trí tuệ nhân tạo và cách mạng định hướng nghề nghiệp trong tương lai',
      excerpt: 'Có thể nói, xã hội loài người đang tiến gần tới một cuộc cách mạng...',
      content: 'Có thể nói, xã hội loài người đang tiến gần tới một cuộc cách mạng công nghệ mới với sự phát triển mạnh mẽ của trí tuệ nhân tạo (AI). AI đang và sẽ tác động mạnh mẽ đến nhiều lĩnh vực, trong đó có định hướng nghề nghiệp...',
      category: 'he-dieu-hanh-linux',
      imageUrl: '/assets/Chuyen-doi-so-doanh-nghiep.jpg',
      slug: 'tri-tue-nhan-tao',
      date: '2023-11-24'
    },
    {
      id: '5',
      title: 'CV của một PR Executive – nhân viên quan hệ công chúng',
      excerpt: 'Ở thời điểm mà mạng xã hội, internet chưa thật sự phát triển mạnh mẽ...',
      content: 'Ở thời điểm mà mạng xã hội, internet chưa thật sự phát triển mạnh mẽ như hiện nay, vai trò của nhân viên quan hệ công chúng (PR Executive) đã rất quan trọng. Ngày nay, với sự bùng nổ của công nghệ thông tin, vai trò này càng trở nên thiết yếu hơn...',
      category: 'ho-tro',
      imageUrl: '/assets/Chuyen-doi-so-doanh-nghiep.jpg',
      slug: 'cv-pr-executive',
      date: '2023-11-23'
    },
    {
      id: '6',
      title: '5 Xu hướng chuyển đổi số trong doanh nghiệp năm 2024',
      excerpt: 'Chuyển đổi số không chỉ là xu thế mà còn là chìa khóa giúp doanh nghiệp bứt phá...',
      content: 'Chuyển đổi số đang trở thành chiến lược trọng yếu của nhiều doanh nghiệp trên toàn cầu. Năm 2024 dự kiến sẽ chứng kiến nhiều xu hướng mới như tích hợp công nghệ AI, IoT, và ứng dụng blockchain để cải thiện hiệu quả vận hành...',
      category: 'blog',
      imageUrl: '/assets/Chuyen-doi-so-doanh-nghiep.jpg',
      slug: 'xu-huong-chuyen-doi-so-2024',
      date: '2023-11-28'
    },
    {
      id: '7',
      title: 'Ứng dụng AI trong dịch vụ khách hàng: Hiệu quả ra sao?',
      excerpt: 'AI đang dần thay đổi cách các doanh nghiệp tương tác với khách hàng...',
      content: 'Với sự phát triển vượt bậc của công nghệ AI, nhiều doanh nghiệp đã ứng dụng nó trong các dịch vụ chăm sóc khách hàng, như chatbot thông minh hay hệ thống phân tích cảm xúc. Những công nghệ này giúp tiết kiệm chi phí và nâng cao trải nghiệm người dùng...',
      category: 'blog',
      imageUrl: '/assets/Chuyen-doi-so-doanh-nghiep.jpg',
      slug: 'ung-dung-ai-khach-hang',
      date: '2023-11-27'
    },
    {
      id: '8',
      title: 'Top 10 công cụ marketing online bạn cần biết',
      excerpt: 'Marketing online ngày càng trở nên quan trọng trong thời đại số hóa...',
      content: 'Các công cụ marketing online như Google Ads, Facebook Ads, HubSpot, và SEMrush đang giúp doanh nghiệp đạt được kết quả ấn tượng trong tiếp thị kỹ thuật số. Hãy cùng khám phá top 10 công cụ phổ biến nhất và cách chúng hỗ trợ chiến lược của bạn...',
      category: 'blog',
      imageUrl: '/assets/Chuyen-doi-so-doanh-nghiep.jpg',
      slug: 'top-10-marketing-tools',
      date: '2023-11-26'
    },
    {
      id: '9',
      title: 'Tại sao chuyển đổi số thất bại ở một số doanh nghiệp?',
      excerpt: 'Không phải doanh nghiệp nào cũng thành công trong chuyển đổi số...',
      content: 'Nhiều doanh nghiệp gặp khó khăn khi triển khai chuyển đổi số do thiếu chiến lược rõ ràng, đội ngũ nhân sự chưa sẵn sàng, hoặc đầu tư không hiệu quả. Hãy tìm hiểu các nguyên nhân chính và giải pháp để đảm bảo thành công trong hành trình số hóa...',
      category: 'blog',
      imageUrl: '/assets/Chuyen-doi-so-doanh-nghiep.jpg',
      slug: 'chuyen-doi-so-that-bai',
      date: '2023-11-25'
    },
    {
      id: '10',
      title: 'Sức mạnh của dữ liệu lớn trong thời đại số',
      excerpt: 'Dữ liệu lớn (Big Data) là tài sản quý giá cho doanh nghiệp hiện nay...',
      content: 'Big Data mang đến cho doanh nghiệp khả năng phân tích và dự đoán xu hướng thị trường, giúp tối ưu hóa quy trình vận hành. Những lợi ích này đang thay đổi cách các doanh nghiệp ra quyết định trong thời đại số...',
      category: 'blog',
      imageUrl: '/assets/Chuyen-doi-so-doanh-nghiep.jpg',
      slug: 'suc-manh-big-data',
      date: '2023-11-24'
    },
    {
      id: '11',
      title: '5 lý do bạn nên triển khai hệ thống CRM ngay hôm nay',
      excerpt: 'Hệ thống quản lý quan hệ khách hàng (CRM) là công cụ thiết yếu trong kinh doanh...',
      content: 'CRM giúp doanh nghiệp quản lý khách hàng hiệu quả, từ lưu trữ thông tin, phân tích dữ liệu, đến xây dựng mối quan hệ lâu dài. Hãy khám phá lý do tại sao việc triển khai CRM là bước đi không thể bỏ qua...',
      category: 'blog',
      imageUrl: '/assets/Chuyen-doi-so-doanh-nghiep.jpg',
      slug: 'trien-khai-crm',
      date: '2023-11-23'
    },
    {
      id: '12',
      title: 'Làm thế nào để tối ưu hóa chiến dịch Google Ads?',
      excerpt: 'Google Ads là một trong những công cụ quảng cáo mạnh mẽ nhất hiện nay...',
      content: 'Để tối ưu hóa chiến dịch Google Ads, bạn cần tập trung vào việc chọn từ khóa phù hợp, viết nội dung quảng cáo hấp dẫn, và tối ưu landing page. Những mẹo sau đây sẽ giúp bạn cải thiện ROI đáng kể...',
      category: 'blog',
      imageUrl: '/assets/Chuyen-doi-so-doanh-nghiep.jpg',
      slug: 'toi-uu-google-ads',
      date: '2023-11-22'
    },
    {
      id: '13',
      title: 'Phân tích SWOT: Công cụ không thể thiếu trong kinh doanh',
      excerpt: 'SWOT giúp doanh nghiệp xác định điểm mạnh, điểm yếu, cơ hội và thách thức...',
      content: 'Phân tích SWOT là một phương pháp cơ bản nhưng hiệu quả trong lập kế hoạch chiến lược. Tìm hiểu cách áp dụng SWOT vào doanh nghiệp của bạn để đưa ra những quyết định đúng đắn...',
      category: 'blog',
      imageUrl: '/assets/Chuyen-doi-so-doanh-nghiep.jpg',
      slug: 'phan-tich-swot',
      date: '2023-11-21'
    },
    {
      id: '14',
      title: 'Làm thế nào để doanh nghiệp nhỏ cạnh tranh với đối thủ lớn?',
      excerpt: 'Doanh nghiệp nhỏ vẫn có thể cạnh tranh nếu biết tận dụng chiến lược...',
      content: 'Mặc dù có nguồn lực hạn chế, các doanh nghiệp nhỏ vẫn có thể cạnh tranh bằng cách tập trung vào thị trường ngách, xây dựng thương hiệu độc đáo, và ứng dụng công nghệ hiện đại. Những mẹo sau đây sẽ giúp bạn vươn lên...',
      category: 'blog',
      imageUrl: '/assets/Chuyen-doi-so-doanh-nghiep.jpg',
      slug: 'canh-tranh-doanh-nghiep-lon',
      date: '2023-11-20'
    },
    {
      id: '15',
      title: 'Tương lai của công nghệ điện toán đám mây',
      excerpt: 'Điện toán đám mây đang định hình cách các doanh nghiệp vận hành...',
      content: 'Điện toán đám mây không chỉ giúp doanh nghiệp tiết kiệm chi phí, mà còn mang lại tính linh hoạt và khả năng mở rộng vượt trội. Tương lai của công nghệ này sẽ còn phát triển mạnh mẽ hơn nữa với những đột phá mới...',
      category: 'blog',
      imageUrl: '/assets/Chuyen-doi-so-doanh-nghiep.jpg',
      slug: 'tuong-lai-dien-toan-dam-may',
      date: '2023-11-19'
    }
    
  ];
  
  