
export const STATUS = {
  INIT: 'Init',
  START: 'Start',
  PENDING: 'Pending',
  INPROGRESS: 'Inprogress',
  COMPLETE: 'Complete',
  PARTITAL: 'Partital',
  PROCESSING: 'Processing',
  CANCELED: 'Canceled',

  WAIT_CONFIRM: 'Wait confirm',
  CONFIRMED: 'Confirmed',
  REJECTED: 'Rejected',
}

export const ORDER_LIST = [
  {
    index: 1,
    quizName: 'Nội dung kiểm tra giữa kỳ',
    convertCreateTime: '13:55 27/09/23',
    numberParticipant: 20,
    passNumber: 15,
    failNumber: 5,
    status: 0,
  },
  {
    index: 2,
    quizName: 'AN TOÀN THÔNG TIN KẾ TOÁN',
    convertCreateTime: '13:55 27/09/23',
    numberParticipant: 0,
    passNumber: 0,
    failNumber: 0,
    status: 0,
  },
  {
    index: 2,
    quizName: 'Câu hỏi trắc nghiệm an ninh thông tin trong chuyển đổi số',
    convertCreateTime: '13:55 27/09/23',
    numberParticipant: 30,
    passNumber: 20,
    failNumber: 10,
    status: 0,
  },
]

export const QUIZ_DETAIL = {
  index: 1,
  title: 'Nội dung kiểm tra giữa kỳ',
  status: 0,
  convertCreateTime: '13:55 27/09/23',
  numberParticipant: 20,
  passNumber: 15,
  failNumber: 5,
  data: [
    {
      question: 'Phần mềm ngăn chặn hành vi:',
      answer: [
        { value: 1, label: 'Theo dõi các hành vi trong thời gian thực của hệ thống' },
        { value: 2, label: 'Phát hiện code có hại trước khi chúng thực hiện' },
        { value: 3, label: 'Theo dõi các tham số của hệ thống' },
        { value: 4, label: 'Tất cả đều đúng' },
      ],
      correctAnswer: 4,
    },
    {
      question: 'Mối đe dọa hoặc Nguy cơ là gì?',
      answer: [
        { value: 1, label: 'Là những sự kiện có khả năng ảnh hưởng đến an toàn của hệ thống.' },
        { value: 2, label: 'Là những sự kiện sử dụng các kỹ thuật vào hệ thống.' },
        { value: 3, label: 'Cả 2 đều sai.' },
        { value: 4, label: 'Cả 2 đều đúng.' },
      ],
      correctAnswer: 1,
    },
    {
      question: 'Thiết bị nào sử dụng bộ lọc gói và các quy tắc truy cập để kiểm soát truy cập đến các mạng riêng từ các mạng công cộng , như là Internet?',
      answer: [
        { value: 1, label: 'Điểm truy cập không dây' },
        { value: 2, label: 'Router' },
        { value: 3, label: 'Tường lửa' },
        { value: 4, label: 'Switch' },
      ],
      correctAnswer: 3,
    },
  ]
}

export const ARTICLE_LIST = [
  {
    index: 1,
    id: '123',
    status: 1,
    convertStatus: STATUS.COMPLETE,
    convertCreateTime: '05/10/23 14:20',
    img: 'https://xehay.vn/uploads/images/2023/10/01/xehay_Tesla%203_051023_3.jpg',
    title: 'Tesla có đến bốn đại diện đều nằm trong top 10 mẫu xe được tìm kiếm nhiều nhất trên Google',
    description: 'Mới đây, Gridserve đã thu thập dữ liệu tìm kiếm trên Google ở hơn 200 quốc gia và đưa ra danh sách những mẫu xe điện được tìm kiếm nhiều nhất.',
    content: `<div>
    <p class="description"><strong>Mới đây, Gridserve đã thu thập dữ liệu tìm kiếm trên Google ở hơn 200 quốc gia và đưa ra danh sách những mẫu xe điện được tìm kiếm nhiều nhất.
</strong>
    </p>
    <div class="news-content" style="position: relative; z-index: 9999">

        <div class="divfirst" style="clear: both; position: relative; z-index: 990; background-color: rgb(255, 255, 255);"><p>Theo dữ liệu thu thập được, <a href="https://xehay.vn/tesla-model-3-2024-chinh-thuc-trinh-lang-sang-trong-nhieu-trang-bi-va-co-pham-vi-hoat-dong-lon-hon.html">Tesla Model 3</a> là mẫu <a href="https://xehay.vn/tesla-model-3-2024-chinh-thuc-trinh-lang-sang-trong-nhieu-trang-bi-va-co-pham-vi-hoat-dong-lon-hon.html">xe điện được tìm kiếm nhiều nhất </a>trên toàn cầu với 20 triệu lượt truy cập.&nbsp;</p><p></p>

<p style="text-align: center;"><img src="https://xehay.vn/uploads/images/2023/10/01/xehay_xe%20EV_051023_2.jpg" style="opacity: 0.9; cursor: url(&quot;/public/auto/images/zoom_cursor.png&quot;), auto;" id="atdl_slide_image_1"></p><p></p>

<p style="text-align: center;"><em>Top 10 mẫu xe điện được tìm kiếm nhiều nhất trên Google</em></p><p></p>

<p>Không có gì ngạc nhiên khi “gã khổng lồ” xe điện Mỹ đứng đầu bảng xếp hạng bởi đây là một thương hiệu có danh tiếng và sở hữu tệp khách hàng ổn định. Đây cũng là hãng xe duy nhất có đến 4 mẫu xe góp mặt trong top 10 mẫu xe được tìm kiếm nhiều nhất trên Google.</p><p></p>

<p style="text-align: center;"><img src="https://xehay.vn/uploads/images/2023/10/01/xehay_Tesla%203_051023_2.jpg" style="opacity: 0.9; cursor: url(&quot;/public/auto/images/zoom_cursor.png&quot;), auto;" id="atdl_slide_image_2"></p><p></p>

<p>Đứng thứ 2 trong bảng xếp hạng là<a href="https://xehay.vn/tesla-model-3-2024-chinh-thuc-trinh-lang-sang-trong-nhieu-trang-bi-va-co-pham-vi-hoat-dong-lon-hon.html"> Kia EV6</a> với 15,8 triệu lượt truy cập). Tiếp đến lần lượt là Tesla Model Y với 13,9 triệu lượt truy cập và Hyundai Ioniq 5 với 12,7 triệu lượt truy cập.</p><p></p></div> <div class="divend" style="position: relative; z-index: 990; background-color: rgb(255, 255, 255);">

<p style="text-align: center;"><img src="https://xehay.vn/uploads/images/2023/10/01/xehay_Tesla%203_051023_4.jpg" style="opacity: 0.9; cursor: url(&quot;/public/auto/images/zoom_cursor.png&quot;), auto;" id="atdl_slide_image_3"></p><p></p>

<p>Trên thực tế, người dùng ở các quốc gia thường tìm kiếm những mẫu xe thông dụng, phù hợp với bản thân và có mối liên hệ mật thiết với quốc gia đó. Chẳng hạn như Lexus RZ, dù là mẫu xe điện được tìm kiếm nhiều nhất ở 47 quốc gia nhưng lại chỉ đứng thứ 9 trong bảng xếp hạng những mẫu xe được tìm kiếm nhiều nhất trên toàn cầu.</p><p></p>

<p style="text-align: center;"><img src="https://xehay.vn/uploads/images/2023/10/01/xehay_xe%20EV_051023_1.jpg" style="opacity: 0.9; cursor: url(&quot;/public/auto/images/zoom_cursor.png&quot;), auto;" id="atdl_slide_image_4"></p><p></p>

<p style="text-align: center;"><em>Những mẫu xe điện được tìm kiếm nhiều nhất ở một số quốc gia</em></p><p></p>

<p>Hay như mẫu <a href="https://xehay.vn/tesla-model-3-2024-chinh-thuc-trinh-lang-sang-trong-nhieu-trang-bi-va-co-pham-vi-hoat-dong-lon-hon.html">Tata Nexon</a> dù thu hút hơn 2 triệu lượt tìm kiếm ở Ấn Độ và là chiếc xe điện được tìm kiếm nhiều nhất ở đất nước này nhưng lại không đạt được thứ hạng cao trên bảng xếp hạng thế giới.</p><p></p>

<p><strong>TH</strong><em><strong> </strong>(Tuoitrethudo)</em></p><p></p></div><!-- #divend -->            <div class="clear"></div>
    </div>
</div>`
  },
  {
    index: 2,
    id: '123',
    status: 0,
    convertStatus: STATUS.INIT,
    convertCreateTime: '03/10/23 21:25',
    img: 'https://xehay.vn/uploads/images/2023/10/01/xehay-hyper-urban-031023%20(6).jpg',
    title: 'Hyper Urban: Mẫu xe concept thể hiện tương lai điện hóa của Nissan',
    description: 'Nissan sẽ trình làng một mẫu xe concept mới thể hiện định hướng tương lai của hãng tại Triển lãm Ô tô Nhật Bản diễn ra vào cuối tháng này.',
    content: `<div>
    <p class="description"><strong>Nissan sẽ trình làng một mẫu xe concept mới thể hiện định hướng tương lai của hãng tại Triển lãm Ô tô Nhật Bản diễn ra vào cuối tháng này.
</strong>
    </p>
    <div class="news-content" style="position: relative; z-index: 9999">

        <div class="divfirst" style="clear: both; position: relative; z-index: 990; background-color: rgb(255, 255, 255);"><p style="text-align: center;"><iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="" frameborder="0" height="315" src="https://www.youtube.com/embed/B_N_E7UwU2k?si=bav2Ogg5MSC0yUuW" title="YouTube video player" width="560"></iframe></p><p></p>

<p>Hãng xe Nhật Bản cho biết Hyper Urban là bản xem trước về khả năng thiết kế và công nghệ của các sản phẩm ô tô điện<a href="https://xehay.vn/tim-kiem/%20Nissan"> Nissan </a>trong tương lai. Ngôn ngữ tạo hình của mẫu xe concept này không hề giống với bất kỳ dòng xe nào của Nissan trước đây, bao gồm cả mẫu SUV điện Ariya. Bên cạnh đó, những đường nét và bề mặt góc cạnh của Hyper Urban khiến nhiều người liên tưởng đến các thiết kế xe gần đây của<a href="https://xehay.vn/tim-kiem/%20Hyundai"> Hyundai.</a></p><p></p>

<p style="text-align: center;"><img src="https://xehay.vn/uploads/images/2023/10/01/xehay-hyper-urban-031023%20(7).jpg" style="opacity: 0.9; cursor: url(&quot;/public/auto/images/zoom_cursor.png&quot;), auto;" id="atdl_slide_image_1"></p><p></p>

<p>Ở phần đầu xe, Hyper Urban đã được lược bỏ hệ thống đèn pha thông thường mà thay vào đó là một thanh đèn LED kéo dài toàn bộ bề ngang. Cản trước hầm hố được sơn màu đen bóng, tương phản với màu vàng chanh bao phủ toàn bộ khu vực ngoại thất. Nissan cho biết đây là một màu sơn đặc biệt, có khả năng “thay đổi màu sắc tùy thuộc vào góc ánh sáng chiếu vào”.</p><p></p>

<p style="text-align: center;"><img src="https://xehay.vn/uploads/images/2023/10/01/xehay-hyper-urban-031023%20(8).jpg" style="opacity: 0.9; cursor: url(&quot;/public/auto/images/zoom_cursor.png&quot;), auto;" id="atdl_slide_image_2"></p><p></p>

<p>Khu vực thân xe nổi bật với thiết kế cửa cánh bướm ở cả phía trước và phía sau. Tuy nhiên, bởi Hyper Urban được định vị là một mẫu xe phổ thông nên ở bản thương mại,&nbsp;Nissan nhiều khả năng sẽ thay thế loại cửa này bằng cửa thông thường.</p><p></p>

<p style="text-align: center;"><img src="https://xehay.vn/uploads/images/2023/10/01/xehay-hyper-urban-031023%20(1).jpg" style="opacity: 0.9; cursor: url(&quot;/public/auto/images/zoom_cursor.png&quot;), auto;" id="atdl_slide_image_3"></p><p></p></div> <div class="divend" style="position: relative; z-index: 990; background-color: rgb(255, 255, 255);">

<p>Cảm hứng tương lai cũng được<a href="https://xehay.vn/tim-kiem/%20Nissan"> Nissan</a> thể hiện trong thiết kế nội thất của Hyper Urban. Theo đó, xe có cấu hình cabin 4 chỗ ngồi với hai ghế trước có thể gập và nối liền với ghế ở hàng dưới, tạo thành một chiếc ghế dài có thể nằm thoải mái. Ngoài ra, xe còn được trang bị hệ thống màn hình giải trí dành cho người ngồi ở hàng ghế thứ hai.</p><p></p>

<p style="text-align: center;"><img src="https://xehay.vn/uploads/images/2023/10/01/xehay-hyper-urban-031023%20(3).jpg" style="opacity: 0.9; cursor: url(&quot;/public/auto/images/zoom_cursor.png&quot;), auto;" id="atdl_slide_image_4"></p><p></p>

<p>Nissan không hé lộ về trang bị động cơ điện trên Hyper Urban bản thương mại, nhưng cho biết xe có tính năng sạc ngược. Bên cạnh đó, xe cũng được thiết kế để đáp ứng các bản cập nhật phần cứng và cập nhật phần mềm thường xuyên.</p><p></p>

<p style="text-align: center;"><img src="https://xehay.vn/uploads/images/2023/10/01/xehay-hyper-urban-031023%20(2).jpg" style="opacity: 0.9; cursor: url(&quot;/public/auto/images/zoom_cursor.png&quot;), auto;" id="atdl_slide_image_5"></p><p></p>

<p style="text-align: center;"><img src="https://xehay.vn/uploads/images/2023/10/01/xehay-hyper-urban-031023%20(5).jpg" style="opacity: 0.9; cursor: url(&quot;/public/auto/images/zoom_cursor.png&quot;), auto;" id="atdl_slide_image_6"></p><p></p>

<p style="text-align: center;"><img src="https://xehay.vn/uploads/images/2023/10/01/xehay-hyper-urban-031023%20(4).jpg" style="opacity: 0.9; cursor: url(&quot;/public/auto/images/zoom_cursor.png&quot;), auto;" id="atdl_slide_image_7"></p><p></p>

<p><strong>Thái Sơn</strong><em> (Tuoitrethudo)</em></p><p></p>

<p><em>Tham khảo: <a href="https://www.carscoops.com/2023/10/nissans-hyper-urban-suv-concept-is-an-ariya-on-crack/">Carscoops</a></em></p><p></p></div><!-- #divend -->            <div class="clear"></div>
    </div>
</div>`
  },
]

export const PROVINCES = [
  { value: '29', text: 'Hà Nội' },
  { value: '15', text: 'Hải Phòng' },
  { value: '17', text: 'Thái Bình' },
  { value: '59', text: 'TP HCM' },
  { value: '55', text: 'Đà Nẵng' },
]

export const AGENCIES = [
  { value: '1', text: 'Đại lý 1' },
  { value: '2', text: 'Đại lý 2' },
  { value: '3', text: 'Đại lý 3' },
  { value: '4', text: 'Đại lý 4' },
  { value: '5', text: 'Đại lý 5' },
]