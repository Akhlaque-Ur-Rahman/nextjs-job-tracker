export type Job = {
    id: string;
    title: string;
    company: string;
    location: string;
    category: string;
    type: "Internship" | "Full-Time" | "Part-Time";
    applyLink: string;
    postedAt: string;
    postedBy?: string; // optional for future use
  };
  