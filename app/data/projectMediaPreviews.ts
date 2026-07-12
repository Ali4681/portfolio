export type ProjectPreviewItem = {
  type: "image" | "video";
  src: string;
  alt: string;
  label?: string;
  duration?: string;
};

export type ProjectMediaPreview = {
  items: readonly ProjectPreviewItem[];
  total: number;
  hasVideo: boolean;
  layout: "portrait" | "landscape" | "video";
};

export const projectMediaPreviews: Partial<
  Record<string, ProjectMediaPreview>
> = {
  AutoService24: {
    items: [
      {
        type: "image",
        src: "/AutoService24/resized_pasted_file_VlFwQ5_screenshot_9_map_directions.png",
        alt: "AutoService24 map and workshop directions",
      },
      {
        type: "image",
        src: "/AutoService24/resized_pasted_file_zwjOrs_screenshot_3_details.png",
        alt: "AutoService24 service details screen",
      },
    ],
    total: 10,
    hasVideo: true,
    layout: "portrait",
  },
  "Olive Leaf Disease Detection": {
    items: [
      {
        type: "image",
        src: "/Olive Leaf Disease Detection/photo_2026-04-09_23-38-29.jpg",
        alt: "Zaytoun olive leaf scanning interface",
      },
      {
        type: "image",
        src: "/Olive Leaf Disease Detection/photo_2026-04-09_23-38-25.jpg",
        alt: "Olive disease AI diagnosis and treatment result",
      },
    ],
    total: 4,
    hasVideo: true,
    layout: "portrait",
  },
  "University Timetable Generator": {
    items: [
      {
        type: "image",
        src: "/University Timetable Generator/dark ar.png",
        alt: "University timetable generator dark Arabic interface",
      },
      {
        type: "image",
        src: "/University Timetable Generator/home.png",
        alt: "University timetable management dashboard",
      },
    ],
    total: 10,
    hasVideo: false,
    layout: "landscape",
  },
  "Islamic Inheritance Management": {
    items: [
      {
        type: "image",
        src: "/Islamic Inheritance Management/3.png",
        alt: "Interactive Islamic inheritance family tree",
      },
      {
        type: "image",
        src: "/Islamic Inheritance Management/1.png",
        alt: "Islamic inheritance cases dashboard",
      },
    ],
    total: 4,
    hasVideo: false,
    layout: "landscape",
  },
  "Traffic Violations Management": {
    items: [
      {
        type: "video",
        src: "/Traffic Violations Management/1.mp4",
        alt: "Traffic violations management walkthrough one",
        label: "Product walkthrough 01",
        duration: "02:39",
      },
      {
        type: "video",
        src: "/Traffic Violations Management/2.mp4",
        alt: "Traffic violations management walkthrough two",
        label: "Product walkthrough 02",
        duration: "02:19",
      },
    ],
    total: 2,
    hasVideo: true,
    layout: "video",
  },
  LegalConnect: {
    items: [
      {
        type: "image",
        src: "/LegalConnect/client/الصفحة الرئيسية (صفحة القضايا).jpg",
        alt: "LegalConnect client cases dashboard",
      },
      {
        type: "image",
        src: "/LegalConnect/lawyer/الواجهة الرئيسية(واجهة عرض القضايا).jpg",
        alt: "LegalConnect lawyer active cases dashboard",
      },
    ],
    total: 27,
    hasVideo: false,
    layout: "portrait",
  },
};
