export type ProjectMediaItem = {
  type: "image" | "video";
  src: string;
  alt: string;
  label: string;
  section: string;
  duration?: string;
  thumbnail?: boolean;
  display?: "contain" | "document";
  width?: number;
  height?: number;
};

export type ProjectMediaCollection = {
  title: string;
  summary: string;
  poster?: string;
  media: ProjectMediaItem[];
};

const image = (
  src: string,
  label: string,
  section: string,
  alt = label,
  thumbnail = true,
): ProjectMediaItem => ({ type: "image", src, alt, label, section, thumbnail });

const video = (
  src: string,
  label: string,
  section: string,
  duration: string,
): ProjectMediaItem => ({
  type: "video",
  src,
  alt: label,
  label,
  section,
  duration,
});

export const projectMediaCatalog: Record<string, ProjectMediaCollection> = {
  AutoService24: {
    title: "AutoService24",
    summary: "Mobile marketplace, live service discovery, maps, and chat.",
    poster:
      "/AutoService24/resized_pasted_file_VlFwQ5_screenshot_9_map_directions.png",
    media: [
      image(
        "/AutoService24/resized_pasted_file_VlFwQ5_screenshot_9_map_directions.png",
        "Map and workshop directions",
        "Mobile app",
      ),
      image(
        "/AutoService24/resized_pasted_file_zwjOrs_screenshot_3_details.png",
        "Service details",
        "Mobile app",
      ),
      image(
        "/AutoService24/resized_pasted_file_mM4OjE_screenshot_1_categories.png",
        "Service categories",
        "Mobile app",
      ),
      image(
        "/AutoService24/resized_pasted_file_8f6HMf_screenshot_2_listings.png",
        "Nearby service listings",
        "Mobile app",
      ),
      image(
        "/AutoService24/resized_pasted_file_GOcHuj_screenshot_4_workshop_info.png",
        "Workshop profile",
        "Mobile app",
      ),
      image(
        "/AutoService24/resized_pasted_file_rH5EGC_screenshot_5_chat.png",
        "Real-time chat",
        "Mobile app",
      ),
      image(
        "/AutoService24/resized_pasted_file_uj9uv3_screenshot_6_add_workshop.png",
        "Add a workshop",
        "Mobile app",
      ),
      image(
        "/AutoService24/resized_pasted_file_X59MaY_screenshot_7_login.png",
        "Secure sign in",
        "Mobile app",
      ),
      image(
        "/AutoService24/resized_pasted_file_DRaPwb_screenshot_8_profile.png",
        "User profile",
        "Mobile app",
      ),
      video(
        "/AutoService24/video.MP4",
        "Complete product walkthrough",
        "Demo video",
        "05:29",
      ),
    ],
  },
  "Olive Leaf Disease Detection": {
    title: "Olive Leaf Disease Detection",
    summary:
      "On-device field diagnosis powered by a four-class MobileNetV2 model.",
    poster: "/Olive Leaf Disease Detection/photo_2026-04-09_23-38-29.jpg",
    media: [
      image(
        "/Olive Leaf Disease Detection/photo_2026-04-09_23-38-29.jpg",
        "Leaf scanning interface",
        "Mobile AI app",
      ),
      image(
        "/Olive Leaf Disease Detection/photo_2026-04-09_23-38-25.jpg",
        "AI diagnosis and treatment plan",
        "Mobile AI app",
      ),
      image(
        "/Olive Leaf Disease Detection/photo_2026-04-09_23-38-21.jpg",
        "Seasonal care calendar",
        "Mobile AI app",
      ),
      video(
        "/Olive Leaf Disease Detection/1.mp4",
        "Field diagnosis walkthrough",
        "Demo video",
        "02:43",
      ),
    ],
  },
  "University Timetable Generator": {
    title: "University Timetable Generator",
    summary:
      "A complete scheduling workspace for modules, rooms, faculty, and exports.",
    media: [
      image(
        "/University Timetable Generator/dark ar.png",
        "Arabic dark-mode workspace",
        "Platform",
      ),
      image(
        "/University Timetable Generator/home.png",
        "Management dashboard",
        "Platform",
      ),
      image(
        "/University Timetable Generator/schedule.png",
        "Generated timetable",
        "Scheduling",
      ),
      image(
        "/University Timetable Generator/modules.jpg",
        "Modules management",
        "Management",
      ),
      image(
        "/University Timetable Generator/doctor.png",
        "Faculty management",
        "Management",
      ),
      image(
        "/University Timetable Generator/student.png",
        "Student management",
        "Management",
      ),
      image(
        "/University Timetable Generator/room.png",
        "Room management",
        "Management",
      ),
      image(
        "/University Timetable Generator/excel_pdf.png",
        "Excel and PDF export",
        "Scheduling",
      ),
      image(
        "/University Timetable Generator/login_signup.png",
        "Authentication flow",
        "Account",
      ),
      image(
        "/University Timetable Generator/reset password.jpg",
        "Password recovery",
        "Account",
      ),
    ],
  },
  "Islamic Inheritance Management": {
    title: "Islamic Inheritance Management",
    summary:
      "Case management, visual heir relationships, and rule-based calculations.",
    media: [
      image(
        "/Islamic Inheritance Management/3.png",
        "Interactive family tree",
        "Web platform",
      ),
      image(
        "/Islamic Inheritance Management/1.png",
        "Inheritance cases dashboard",
        "Web platform",
      ),
      image(
        "/Islamic Inheritance Management/2.png",
        "Create a new inheritance case",
        "Web platform",
      ),
      image(
        "/Islamic Inheritance Management/4.png",
        "Administration and users",
        "Web platform",
      ),
    ],
  },
  "Traffic Violations Management": {
    title: "Traffic Violations Management",
    summary:
      "Two complete product walkthroughs across the multi-role mobile system.",
    media: [
      video(
        "/Traffic Violations Management/1.mp4",
        "Product walkthrough 01",
        "Demo videos",
        "02:39",
      ),
      video(
        "/Traffic Violations Management/2.mp4",
        "Product walkthrough 02",
        "Demo videos",
        "02:19",
      ),
    ],
  },
  LegalConnect: {
    title: "LegalConnect",
    summary:
      "A role-aware legal workflow for clients and lawyers, from onboarding to live cases.",
    media: [
      image(
        "/LegalConnect/client/الصفحة الرئيسية (صفحة القضايا).jpg",
        "Client cases dashboard",
        "Client app",
      ),
      image(
        "/LegalConnect/lawyer/الواجهة الرئيسية(واجهة عرض القضايا).jpg",
        "Lawyer active cases dashboard",
        "Lawyer app",
      ),
      image(
        "/LegalConnect/client/تسجيل دخول.jpg",
        "Client sign in",
        "Client app",
      ),
      image(
        "/LegalConnect/client/إنشاء حساب.jpg",
        "Create client account",
        "Client app",
      ),
      image(
        "/LegalConnect/client/كمالة إنشاء حساب.jpg",
        "Complete client registration",
        "Client app",
      ),
      image(
        "/LegalConnect/client/إنشاء قضية(إختيار محكمة).jpg",
        "Choose a court",
        "Client app",
      ),
      image(
        "/LegalConnect/client/إنشاء قضية(إختيار محامي).jpg",
        "Choose a lawyer",
        "Client app",
      ),
      image(
        "/LegalConnect/client/إنشاء قضية(إرسال الطلب.jpg",
        "Submit a case request",
        "Client app",
      ),
      image(
        "/LegalConnect/client/صفحة الإشعارات.jpg",
        "Client notifications",
        "Client app",
      ),
      image(
        "/LegalConnect/client/الاشعارات (قبول أو رفض).jpg",
        "Case request decision",
        "Client app",
      ),
      image(
        "/LegalConnect/client/صفحة المحادثات.jpg",
        "Client conversations",
        "Client app",
      ),
      image(
        "/LegalConnect/client/صفحة الدردشة(داخل المحادثة).jpg",
        "Client chat thread",
        "Client app",
      ),
      image(
        "/LegalConnect/client/واجهة الملف الشخصي.jpg",
        "Client profile",
        "Client app",
      ),
      image(
        "/LegalConnect/lawyer/واجهةتسجيل الدخول.jpg",
        "Lawyer sign in",
        "Lawyer app",
      ),
      image(
        "/LegalConnect/lawyer/واجهة إنشاء حساب.jpg",
        "Create lawyer account",
        "Lawyer app",
      ),
      image(
        "/LegalConnect/lawyer/كمالة واجهة إنشاء حساب.jpg",
        "Complete lawyer registration",
        "Lawyer app",
      ),
      image(
        "/LegalConnect/lawyer/واجهة عرض تفاصيل القضية.jpg",
        "Case details",
        "Lawyer app",
      ),
      image(
        "/LegalConnect/lawyer/واجهة الاشعارات(قسم الاشعارات).jpg",
        "Lawyer notifications",
        "Lawyer app",
      ),
      image(
        "/LegalConnect/lawyer/واجهة الاشعارات (قسم القضايا المنتظرة).jpg",
        "Pending case requests",
        "Lawyer app",
      ),
      image(
        "/LegalConnect/lawyer/واجهة عرض المحادثات.jpg",
        "Lawyer conversations",
        "Lawyer app",
      ),
      image(
        "/LegalConnect/lawyer/واجهة الدردشة داخل المحادثة.jpg",
        "Lawyer chat thread",
        "Lawyer app",
      ),
      image(
        "/LegalConnect/lawyer/واجهة الملف الشخصي.jpg",
        "Lawyer profile",
        "Lawyer app",
      ),
      image(
        "/LegalConnect/lawyer/المعلومات المستخرجة الجزأ 1.jpg",
        "Extracted case data — part 1",
        "Document intelligence",
      ),
      image(
        "/LegalConnect/lawyer/المعلومات المستخرجة الجزأ 2.jpg",
        "Extracted case data — part 2",
        "Document intelligence",
      ),
      image(
        "/LegalConnect/lawyer/المعلومات المستخرجة الجزأ 3.jpg",
        "Extracted case data — part 3",
        "Document intelligence",
      ),
      image(
        "/LegalConnect/lawyer/المعلومات المستخرجة الجزأ 4.jpg",
        "Extracted case data — part 4",
        "Document intelligence",
      ),
      {
        type: "image",
        src: "/LegalConnect/lawyer/المعلومات المستخرجة كامل.jpg",
        alt: "Complete extracted case document",
        label: "Complete extracted case document",
        section: "Document intelligence",
        thumbnail: false,
        display: "document",
        width: 1220,
        height: 13700,
      },
    ],
  },
};
