"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "vi" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const translations = {
  vi: {
    nav: {
      about: "Giới thiệu",
      experience: "Kinh nghiệm",
      skills: "Kỹ năng",
      projects: "Dự án",
      contact: "Liên hệ",
      cv: "Tải CV",
    },
    hero: {
      greeting: "Xin chào,",
      name: "Phạm Thế Anh",
      role: "Fullstack Developer",
      intro: "Lập trình viên Fullstack với gần 2 năm kinh nghiệm thực chiến phát triển các hệ thống quản lý nội bộ (ERP) và CRM bằng ReactJS, NextJS, Spring Boot và NestJS. Luôn hướng tới tối ưu hiệu năng và nâng cao trải nghiệm người dùng.",
      ctaProjects: "Xem Dự Án",
      ctaCv: "Tải CV Bản Đầy Đủ",
    },
    about: {
      title: "Về Bản Thân",
      text1: "Tôi là một lập trình viên Fullstack đầy nhiệt huyết, tốt nghiệp chuyên ngành Công nghệ thông tin tại Trường Đại học Kiến Trúc Hà Nội (GPA 3.13/4.0). Tôi có tư duy lập trình vững chắc, khả năng làm việc độc lập cũng như phối hợp nhóm hiệu quả theo mô hình Agile/Scrum.",
      text2: "Thế mạnh của tôi là xây dựng các RESTful API hiệu năng cao, tối ưu hóa cơ sở dữ liệu (PostgreSQL, MySQL) và kiến tạo các giao diện người dùng mượt mượt mà, responsive tuyệt đối trên mọi thiết bị. Tôi luôn chú trọng vào mã nguồn sạch (Clean Code), tính tái sử dụng và khả năng mở rộng hệ thống.",
      education: "Học Vấn",
      school: "Trường Đại học Kiến Trúc Hà Nội (2020 - 2025)",
      major: "Chuyên ngành: Công nghệ thông tin",
      gpa: "GPA: 3.13 / 4.0",
      others: "Kỹ năng khác",
      othersText: "Làm việc nhóm Agile/Scrum, kiểm thử API Postman, quản lý DB Liquibase, Docker Compose, đa ngôn ngữ i18n, quản lý mã nguồn Git/GitHub/GitLab.",
    },
    experience: {
      title: "Kinh Nghiệm Làm Việc",
      present: "Hiện tại",
      jobs: [
        {
          period: "01/2026 - 05/2026",
          company: "Viện nghiên cứu và phát triển sản phẩm thiên nhiên (IRDOP)",
          role: "Fullstack Developer",
          codeFile: "irdop_erp.tsx",
          bullets: [
            "Phát triển hệ thống quản lý nội bộ toàn diện sử dụng hệ sinh thái ReactJS, NextJS và NestJS.",
            "Thiết kế RESTful API, xử lý các nghiệp vụ logic backend phức tạp và quản lý dữ liệu trên PostgreSQL.",
            "Xây dựng và hoàn thiện các phân hệ chức năng cốt lõi: phân quyền, quản lý người dùng, bán hàng và quản lý kho hóa chất.",
            "Tham gia lập kế hoạch, họp kỹ thuật và bám sát tiến độ dự án theo mô hình Agile/Scrum bằng Git/GitHub."
          ],
          codeText: `// Module: IRDOP ERP System
import { Developer, NestJS, NextJS, PostgreSQL } from "pham-the-anh";

export const IRDOPExperience: Developer = {
  role: "Fullstack Developer",
  period: "01/2026 - 05/2026",
  company: "Institute of Natural Products R&D (IRDOP)",
  frameworks: [NextJS, NestJS],
  database: PostgreSQL,
  
  achievements: [
    "Phát triển toàn diện ERP nội bộ (NextJS/NestJS/PostgreSQL)",
    "Xây dựng API bảo mật cao cho module Phân quyền & Quản lý Kho",
    "Thiết kế cấu trúc bảng và quản lý cập nhật DB bằng Data Migration",
    "Phối hợp phát triển Agile/Scrum bám sát tiến độ Git/GitHub"
  ],
  cleanCode: true,
  status: "Completed_Successfully"
};`
        },
        {
          period: "10/2025 - 12/2025",
          company: "Công ty cổ phần công nghệ và đầu tư BITB",
          role: "Front-end Developer",
          codeFile: "bitb_taxi.native",
          bullets: [
            "Phát triển giao diện website công ty và ứng dụng di động đặt xe công nghệ bằng ReactJS và React Native.",
            "Tích hợp RESTful API hệ thống và tối ưu hóa hiển thị giao diện responsive mượt mà trên đa thiết bị.",
            "Triển khai giải pháp WebSocket để xử lý tính năng gọi thoại (voice call) cơ bản trực tiếp giữa hai tài khoản."
          ],
          codeText: `// Module: BITB Ride-Hailing App
import { Developer, ReactJS, ReactNative, WebSocket } from "pham-the-anh";

export const BITBExperience: Developer = {
  role: "Front-end Developer",
  period: "10/2025 - 12/2025",
  company: "BITB Technology & Investment JSC",
  platforms: [ReactJS, ReactNative],
  protocols: [WebSocket],
  
  achievements: [
    "Phát triển UI ứng dụng di động đặt xe công nghệ (React Native)",
    "Chuyển đổi Figma pixel-perfect sang Web/App Responsive",
    "Tích hợp WebSocket Gateway xử lý voice-call giữa hai tài khoản",
    "Kiểm thử và tích hợp RESTful API hệ thống bằng Postman"
  ],
  responsiveDesign: "Pixel_Perfect",
  performance: "60fps_Smooth"
};`
        },
        {
          period: "09/2024 - 09/2025",
          company: "Công ty cổ phần FAFU",
          role: "Fullstack Developer",
          codeFile: "fafu_core.java",
          bullets: [
            "Phát triển giao diện hệ thống quản lý responsive bằng ReactJS và TailwindCSS.",
            "Thiết kế RESTful API bằng Spring Boot phục vụ cho các chức năng phân quyền, quản lý công việc và người dùng.",
            "Tối ưu hiệu năng xử lý dữ liệu backend và cải thiện trải nghiệm tương tác của người dùng trên hệ thống.",
            "Phối hợp chặt chẽ với đội ngũ theo mô hình Agile/Scrum, quản lý tiến độ công việc qua Git và Jira."
          ],
          codeText: `// Module: FAFU Corporate Management
import { Developer, SpringBoot, ReactJS, Liquibase } from "java-spring";

public class FAFUExperience implements Developer {
    public static final String ROLE = "Fullstack Developer";
    public static final String PERIOD = "09/2024 - 09/2025";
    
    public void executeDuties() {
        SpringBoot.createRESTfulAPI("/api/auth", "/api/jobs");
        ReactJS.buildResponsiveUI("TailwindCSS", "AntDesign");
        Liquibase.syncDatabase("MySQL_Migration");
        
        System.out.println("Tối ưu hóa câu lệnh SQL: API latency giảm 30%");
    }
}`
        }
      ]
    },
    skills: {
      title: "Bộ Kỹ Năng Kỹ Thuật",
      subtitle: "Những công cụ và công nghệ tôi sử dụng để kiến tạo các sản phẩm số chất lượng",
      categories: {
        frontend: "Frontend Development",
        backend: "Backend Development",
        database: "Database & Storage",
        devops: "DevOps & Tools"
      }
    },
    projects: {
      title: "Dự Án Thực Tế",
      subtitle: "Các sản phẩm tiêu biểu tôi trực tiếp thiết kế, phát triển và tối ưu hiệu năng",
      techUsed: "Công nghệ sử dụng",
      role: "Vai trò",
      items: [
        {
          title: "Hệ thống Quản lý Phòng thí nghiệm LIMS",
          period: "03/2026 - 05/2026",
          role: "Fullstack Developer",
          desc: "Hệ thống ERP chuyên sâu quản lý thông tin phòng thí nghiệm, tiếp nhận mẫu, quản lý khách hàng (CRM) và kho hóa chất. Thiết kế giao diện Dashboard mượt mà bằng NextJS và xây dựng RESTful API NestJS mạnh mẽ ở Backend.",
          keyPoints: [
            "Tích hợp đa ngôn ngữ (Anh - Việt) sử dụng i18n và tích hợp API ViettelPost tạo mã vận đơn tự động.",
            "Xây dựng chức năng lưu vết lịch sử (Audit Log) cho module Kiểm thử viên và upload tệp đa định dạng.",
            "Thiết kế cấu trúc bảng và quản lý nâng cấp cơ sở dữ liệu PostgreSQL qua Data Migration."
          ],
          tech: ["NextJS 14+", "Tailwind CSS", "Framer Motion", "i18n", "NestJS", "PostgreSQL", "ViettelPost API", "Git"]
        },
        {
          title: "Website Quản lý Nội bộ ERP IRDOP",
          period: "01/2026 - 03/2026",
          role: "Fullstack Developer",
          desc: "Hệ thống quản lý thông tin tiếp nhận dữ liệu khách hàng, hóa đơn và lưu thông tin vận hành nội bộ của viện IRDOP.",
          keyPoints: [
            "Thiết kế Dashboard trực quan tổng hợp dữ liệu và màn hình tiếp nhận thông tin bằng ReactJS và Ant Design.",
            "Tích hợp trình soạn thảo TinyMCE để chỉnh sửa biểu mẫu, hóa đơn, chứng từ và kết xuất file PDF in ấn trực tiếp.",
            "Tối ưu cấu trúc API Response ở phía Backend NestJS giúp cải thiện tốc độ render giao diện."
          ],
          tech: ["ReactJS", "Ant Design", "NestJS", "TinyMCE", "PostgreSQL", "REST API"]
        },
        {
          title: "Ứng Dụng Di Động Đặt Xe BITB",
          period: "11/2025 - 12/2025",
          role: "Front-end Developer",
          desc: "Ứng dụng di động hỗ trợ người dùng đặt xe công nghệ trên hệ điều hành Android/iOS.",
          keyPoints: [
            "Phát triển giao diện ứng dụng di động mượt mà dựa trên thiết kế Figma sử dụng React Native.",
            "Tích hợp hệ thống RESTful API cho module Sổ địa chỉ (quản lý thêm, sửa, xóa, hiển thị chi tiết địa chỉ)."
          ],
          tech: ["React Native", "JavaScript", "REST API", "Figma", "Git"]
        },
        {
          title: "Website Giới Thiệu Doanh Nghiệp BITB",
          period: "10/2025 - 11/2025",
          role: "Front-end Developer",
          desc: "Website giới thiệu công ty tích hợp các tính năng tương tác khách hàng và hỗ trợ trực tuyến.",
          keyPoints: [
            "Chuyển đổi pixel-perfect từ bản thiết kế Figma thành giao diện web responsive hoàn chỉnh.",
            "Triển khai giải pháp WebSocket để xử lý cuộc gọi thoại (voice call) cơ bản trực tiếp giữa 2 tài khoản."
          ],
          tech: ["ReactJS", "Tailwind CSS", "Ant Design", "WebSocket", "REST API", "Git"]
        },
        {
          title: "Hệ thống Quản lý Biên bản & Văn bản VOSA",
          period: "09/2024 - 09/2025",
          role: "Fullstack Developer",
          desc: "Hệ thống quản lý văn bản, biên bản họp và báo cáo số hóa phục vụ Hội đồng quản trị cho các doanh nghiệp cảng biển lớn (VOSA, CANTHOPORT, VIMC).",
          keyPoints: [
            "Phát triển RESTful API Spring Boot hỗ trợ đính kèm và xử lý tệp tài liệu văn bản (Word, Excel, PDF).",
            "Tối ưu hóa các câu lệnh SQL phục vụ API, giúp giảm thời gian phản hồi dữ liệu của module Công việc từ 0.8s xuống 0.5s (tối ưu ~30%).",
            "Quản lý đồng bộ và di chuyển cấu trúc cơ sở dữ liệu MySQL bằng Liquibase."
          ],
          tech: ["ReactJS", "Tailwind CSS", "Ant Design", "Java Spring Boot", "MySQL", "Liquibase", "Docker"]
        }
      ]
    },
    contact: {
      title: "Liên Hệ Với Tôi",
      subtitle: "Bạn có dự án thú vị hay đang tìm kiếm một vị trí Fullstack Developer? Hãy liên hệ ngay!",
      infoTitle: "Thông tin liên hệ",
      location: "Hà Đông, Hà Nội, Việt Nam",
      formName: "Họ và Tên",
      formEmail: "Email liên hệ",
      formMsg: "Lời nhắn của bạn",
      formSubmit: "Gửi lời nhắn",
      successMsg: "Cảm ơn bạn! Lời nhắn của bạn đã được giả lập gửi thành công.",
      socials: "Mạng xã hội"
    }
  },
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      cv: "Download CV",
    },
    hero: {
      greeting: "Hi, I'm",
      name: "Pham The Anh",
      role: "Fullstack Developer",
      intro: "Fullstack Developer with nearly 2 years of practical experience developing ERP and CRM systems using ReactJS, NextJS, Spring Boot, and NestJS. Passionate about system performance optimization and delivering seamless user experiences.",
      ctaProjects: "View Projects",
      ctaCv: "Download Full CV",
    },
    about: {
      title: "About Me",
      text1: "I am a passionate Fullstack Developer, graduated from Hanoi University of Architecture with a Bachelor's degree in Information Technology (GPA 3.13/4.0). I possess solid coding logical thinking, along with the ability to work independently as well as collaborate efficiently in Agile/Scrum environments.",
      text2: "My core strength lies in building high-performance RESTful APIs, optimizing relational databases (PostgreSQL, MySQL), and crafting pixel-perfect responsive user interfaces. I always pay close attention to Clean Code, component reusability, and architectural scalability.",
      education: "Education",
      school: "Hanoi University of Architecture (2020 - 2025)",
      major: "Major: Information Technology",
      gpa: "GPA: 3.13 / 4.0",
      others: "Other Skills",
      othersText: "Agile/Scrum team coordination, Postman API testing, Liquibase DB migration, Docker Compose, i18n localization, Git/GitHub/GitLab version control.",
    },
    experience: {
      title: "Work Experience",
      present: "Present",
      jobs: [
        {
          period: "01/2026 - 05/2026",
          company: "Institute of Natural Products Research and Development (IRDOP)",
          role: "Fullstack Developer",
          codeFile: "irdop_erp.tsx",
          bullets: [
            "Developed a comprehensive internal management ERP using ReactJS, NextJS, and NestJS ecosystem.",
            "Designed robust RESTful APIs, handled complex backend business logic, and managed database schemas in PostgreSQL.",
            "Built core modules: authorization/role management, user directory, sales workflows, and chemical warehouse inventory control.",
            "Participated in sprint planning, technical discussions, and tracked sprint progress using Agile/Scrum via Git/GitHub."
          ],
          codeText: `// Module: IRDOP ERP System
import { Developer, NestJS, NextJS, PostgreSQL } from "pham-the-anh";

export const IRDOPExperience: Developer = {
  role: "Fullstack Developer",
  period: "01/2026 - 05/2026",
  company: "Institute of Natural Products R&D (IRDOP)",
  frameworks: [NextJS, NestJS],
  database: PostgreSQL,
  
  achievements: [
    "Full-scale development of internal ERP (NextJS/NestJS/PostgreSQL)",
    "Built secure API endpoints for Authorization & Inventory modules",
    "Designed database schemas and managed updates via Data Migrations",
    "Coordinated sprint progress strictly under Agile/Scrum via Git/GitHub"
  ],
  cleanCode: true,
  status: "Completed_Successfully"
};`
        },
        {
          period: "10/2025 - 12/2025",
          company: "BITB Technology and Investment Joint Stock Company",
          role: "Front-end Developer",
          codeFile: "bitb_taxi.native",
          bullets: [
            "Developed responsive corporate website interfaces and ride-hailing mobile applications using ReactJS and React Native.",
            "Integrated backend RESTful APIs and optimized UI rendering to ensure fluid cross-device experiences.",
            "Implemented WebSocket solution for basic point-to-point voice calling feature between user accounts."
          ],
          codeText: `// Module: BITB Ride-Hailing App
import { Developer, ReactJS, ReactNative, WebSocket } from "pham-the-anh";

export const BITBExperience: Developer = {
  role: "Front-end Developer",
  period: "10/2025 - 12/2025",
  company: "BITB Technology & Investment JSC",
  platforms: [ReactJS, ReactNative],
  protocols: [WebSocket],
  
  achievements: [
    "Developed core UI of smart taxi ride-hailing app (React Native)",
    "Translated high-fidelity Figma templates into Responsive Web/App",
    "Integrated WebSocket Gateway for peer-to-peer voice calls",
    "Integrated and tested system-wide RESTful APIs using Postman"
  ],
  responsiveDesign: "Pixel_Perfect",
  performance: "60fps_Smooth"
};`
        },
        {
          period: "09/2024 - 09/2025",
          company: "FAFU Joint Stock Company",
          role: "Fullstack Developer",
          codeFile: "fafu_core.java",
          bullets: [
            "Built responsive web portals and management consoles using ReactJS and TailwindCSS.",
            "Designed Spring Boot RESTful APIs for authorization, role-based access, task tracking, and user directories.",
            "Optimized backend data processing and enhanced frontend interactive latency and states.",
            "Coordinated closely with teammates using Agile/Scrum, managed project tasks via Git and Jira."
          ],
          codeText: `// Module: FAFU Corporate Management
import { Developer, SpringBoot, ReactJS, Liquibase } from "java-spring";

public class FAFUExperience implements Developer {
    public static final String ROLE = "Fullstack Developer";
    public static final String PERIOD = "09/2024 - 09/2025";
    
    public void executeDuties() {
        SpringBoot.createRESTfulAPI("/api/auth", "/api/jobs");
        ReactJS.buildResponsiveUI("TailwindCSS", "AntDesign");
        Liquibase.syncDatabase("MySQL_Migration");
        
        System.out.println("SQL Optimization: Reduced API latency by 30%");
    }
}`
        }
      ]
    },
    skills: {
      title: "Technical Expertise",
      subtitle: "The tools, languages, and frameworks I use to build robust digital solutions",
      categories: {
        frontend: "Frontend Development",
        backend: "Backend Development",
        database: "Database & Storage",
        devops: "DevOps & Tools"
      }
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Some of the notable applications I have built, contributed to, and optimized",
      techUsed: "Tech stack",
      role: "Role",
      items: [
        {
          title: "LIMS Laboratory Management System",
          period: "03/2026 - 05/2026",
          role: "Fullstack Developer",
          desc: "A highly specialized ERP managing lab workflows, sample receipts, CRM, technician logs, and chemical stocks. Built with a sleek NextJS dashboard and a robust NestJS backend API.",
          keyPoints: [
            "Integrated multi-language support (English - Vietnamese) using i18n and automatic tracking generation via ViettelPost API.",
            "Implemented a comprehensive Audit Log for testing tracking and supported multi-format file uploads (Word, Excel, PDF, etc.).",
            "Designed schemas and handled PostgreSQL database schema evolution using structured Data Migrations."
          ],
          tech: ["NextJS 14+", "Tailwind CSS", "Framer Motion", "i18n", "NestJS", "PostgreSQL", "ViettelPost API", "Git"]
        },
        {
          title: "ERP Internal Portal IRDOP",
          period: "01/2026 - 03/2026",
          role: "Fullstack Developer",
          desc: "An internal administrative ERP system to track business receipts, client invoices, and chemical stocks at the IRDOP institute.",
          keyPoints: [
            "Designed a highly graphical dashboard and custom sample intake forms using ReactJS and Ant Design.",
            "Integrated TinyMCE rich text editor for invoice and voucher styling, with instant PDF render and print features.",
            "Refactored NestJS API response structures to optimize client-side state mapping and rendering speed."
          ],
          tech: ["ReactJS", "Ant Design", "NestJS", "TinyMCE", "PostgreSQL", "REST API"]
        },
        {
          title: "BITB Mobile Ride-Hailing App",
          period: "11/2025 - 12/2025",
          role: "Front-end Developer",
          desc: "A client-side mobile application enabling users to book and schedule smart ride-hailing services.",
          keyPoints: [
            "Translated comprehensive Figma templates into fluid mobile screens using React Native.",
            "Integrated complex RESTful APIs for the Address Book module (including create, read, update, and delete address features)."
          ],
          tech: ["React Native", "JavaScript", "REST API", "Figma", "Git"]
        },
        {
          title: "BITB Corporate Website",
          period: "10/2025 - 11/2025",
          role: "Front-end Developer",
          desc: "A modern corporate website highlighting company products and offering instant online support.",
          keyPoints: [
            "Achieved pixel-perfect Figma designs using structured, responsive ReactJS and Tailwind CSS components.",
            "Implemented a custom WebSocket gateway to enable seamless real-time voice calls between connected accounts."
          ],
          tech: ["ReactJS", "Tailwind CSS", "Ant Design", "WebSocket", "REST API", "Git"]
        },
        {
          title: "VOSA Meeting Document Manager",
          period: "09/2024 - 09/2025",
          role: "Fullstack Developer",
          desc: "A secure digital board portal and document manager designed for major port conglomerates (VOSA, CANTHOPORT, VIMC).",
          keyPoints: [
            "Developed custom Java Spring Boot RESTful endpoints for document parsing, uploads, and attachment handles (Word, Excel, PDF).",
            "Optimized heavy database query plans, dropping critical API response latency for task updates from 0.8s to 0.5s (30% latency reduction).",
            "Managed safe database evolution and upgrades inside MySQL using Liquibase migrations."
          ],
          tech: ["ReactJS", "Tailwind CSS", "Ant Design", "Java Spring Boot", "MySQL", "Liquibase", "Docker"]
        }
      ]
    },
    contact: {
      title: "Contact Me",
      subtitle: "Got an interesting project in mind or looking for a skilled Fullstack Developer? Let's connect!",
      infoTitle: "Contact Info",
      location: "Ha Dong, Hanoi, Vietnam",
      formName: "Full Name",
      formEmail: "Email Address",
      formMsg: "Your Message",
      formSubmit: "Send Message",
      successMsg: "Thank you! Your simulated message has been sent successfully.",
      socials: "Social Networks"
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("vi");

  useEffect(() => {
    const saved = localStorage.getItem("preferred-language") as Language;
    if (saved === "vi" || saved === "en") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferred-language", lang);
  };

  const t = (key: string) => {
    const keys = key.split(".");
    let result: any = translations[language];
    
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        return key; // Fallback to raw key
      }
    }
    
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
