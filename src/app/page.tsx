"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import {
  Download, Menu, X, Globe, Mail, Phone, MapPin, ExternalLink,
  FolderGit2, GraduationCap
} from "lucide-react";

import {
  Github, Linkedin, ReactIcon, NextIcon, SpringIcon, NestIcon, 
  PostgreSQLIcon, DockerIcon, TailwindIcon, GitIcon, 
  ReactCategoryIcon, NestCategoryIcon, PostgreSQLCategoryIcon, DockerCategoryIcon
} from "@/components/Icons";

// High-performance spring-based viewport scroll animations
const revealContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

const revealItem: any = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 16,
      duration: 0.6
    }
  }
};

const scaleReveal: any = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 15,
      duration: 0.6
    }
  }
};

const skillsList = ["ReactJS", "NextJS", "React Native", "TailwindCSS", "Spring Boot", "NestJS", "RESTful API", "PostgreSQL", "MySQL", "Docker", "Git", "WebSocket", "Ant Design", "Liquibase", "i18n", "TypeScript", "JavaScript", "Java"];

// Rich detailed data dictionary for the Project Details Modal (Vietnamese & English)
const projectDetails: Record<string, {
  vi: {
    overview: string;
    architecture: string;
    features: string[];
    outcomes: string[];
  };
  en: {
    overview: string;
    architecture: string;
    features: string[];
    outcomes: string[];
  };
}> = {
  "LIMS Laboratory Management System": {
    vi: {
      overview: "Hệ thống quản lý phòng thí nghiệm (LIMS) là một giải pháp ERP quy mô lớn chuyên sâu, số hóa toàn bộ quy trình nghiệp vụ: từ tiếp nhận mẫu, kiểm nghiệm, quản lý nhật ký kiểm nghiệm viên, quản lý kho hóa chất đến theo dõi chăm sóc khách hàng (CRM).",
      architecture: "Next.js 14 (App Router) + NestJS Backend API + PostgreSQL + Sequelize ORM + ViettelPost API integration.",
      features: [
        "Hệ thống phân quyền chi tiết (RBAC) chặt chẽ giữa Quản trị viên, Kiểm nghiệm viên, Thủ kho và Khách hàng.",
        "Nhập xuất dữ liệu báo cáo dạng bảng động, hỗ trợ tải lên đa định dạng (Word, Excel, PDF).",
        "Tự động tra cứu mã vận đơn và tạo đơn giao nhận thông qua tích hợp trực tiếp API ViettelPost.",
        "Module Audit Log lưu trữ đầy đủ lịch sử thay đổi thông tin mẫu để đáp ứng tiêu chuẩn kiểm nghiệm ISO."
      ],
      outcomes: [
        "Số hóa 100% tài liệu giấy tờ, rút ngắn thời gian xử lý thủ tục tiếp nhận mẫu từ 30 phút xuống còn 3 phút.",
        "Kiểm soát chính xác thời gian thực hạn sử dụng và số lượng hóa chất trong kho, giảm thiểu 20% hao phí."
      ]
    },
    en: {
      overview: "The Laboratory Management System (LIMS) is an enterprise-grade ERP solution that digitizes all laboratory workflows: sample receipts, testing logs, chemist activities, chemical warehouse stocks, and CRM.",
      architecture: "Next.js 14 (App Router) + NestJS Backend API + PostgreSQL Database + Sequelize ORM + ViettelPost API Integration.",
      features: [
        "Strict Role-Based Access Control (RBAC) separating Admin, Chemist, Warehouse Manager, and Client roles.",
        "Dynamic report data imports/exports supporting multi-format files (Word, Excel, PDF).",
        "Automatic tracking label generation and courier dispatching via direct ViettelPost API integration.",
        "Robust Audit Log capturing all modification histories to fulfill strict ISO laboratory guidelines."
      ],
      outcomes: [
        "100% digital transition of manual paperwork, cutting down sample reception time from 30 minutes to 3 minutes.",
        "Real-time tracking of chemical stocks and expiration dates, reducing chemical waste by 20%."
      ]
    }
  },
  "ERP Internal Portal IRDOP": {
    vi: {
      overview: "Hệ thống cổng thông tin ERP nội bộ của Viện IRDOP hỗ trợ ban lãnh đạo và các bộ phận theo dõi ngân sách thu chi, xuất hóa đơn tài chính cho khách hàng, và kiểm kê kho nguyên liệu thô.",
      architecture: "React.js + Ant Design UI System + NestJS Backend API + PostgreSQL + TinyMCE Rich Text Editor.",
      features: [
        "Thiết kế Dashboard trực quan sinh động với biểu đồ cột, biểu đồ tròn thống kê doanh thu thời gian thực.",
        "Bộ soạn thảo văn bản TinyMCE tích hợp tùy biến định dạng phiếu thu/chi, hỗ trợ render PDF và in trực tiếp tại trình duyệt.",
        "Module quản lý danh mục đối tác khách hàng kết nối đồng bộ dữ liệu liên hệ."
      ],
      outcomes: [
        "Giảm tải 40% khối lượng công việc kế toán thủ công nhờ hệ thống tạo hóa đơn và phiếu thu chi tự động.",
        "Tối ưu hóa tốc độ tải dữ liệu trang Dashboard lên tới 50% thông qua các truy vấn gộp (Database Aggregate Queries)."
      ]
    },
    en: {
      overview: "The IRDOP internal ERP portal is designed for administrative coordinators to track business expenses, generate customer invoices, and control natural raw material stocks.",
      architecture: "ReactJS + Ant Design UI Library + NestJS API + PostgreSQL + TinyMCE Rich Text integration.",
      features: [
        "Sleek and analytical dashboard displaying real-time financial charts and graphs.",
        "Customized voucher layouts built with TinyMCE editor, enabling immediate PDF generation and printing.",
        "Centralized client directory with automated synchronization of balance due and sales records.",
        "Integrated secure cookie-based session management at the API gateway layer."
      ],
      outcomes: [
        "40% reduction in manual bookkeeping workload thanks to automated invoice and voucher compilation.",
        "50% speedup in dashboard loading latency achieved by indexing database tables and optimizing backend queries."
      ]
    }
  },
  "BITB Mobile Ride-Hailing App": {
    vi: {
      overview: "Ứng dụng gọi xe công nghệ thông minh trên nền tảng di động cho phép khách hàng đặt xe, xem bản đồ lộ trình di chuyển, và theo dõi lịch sử hành trình.",
      architecture: "React Native + Redux Toolkit + RESTful API Integration + Figma prototype alignment.",
      features: [
        "Giao diện chuẩn Responsive Native mượt mà thích ứng hoàn hảo trên mọi kích thước màn hình iOS và Android.",
        "Module sổ địa chỉ (Address Book) thông minh lưu trữ các điểm đến thường xuyên, hỗ trợ tìm kiếm nhanh.",
        "Liên kết API định vị Google Maps để hiển thị trực quan thông tin tài xế và quãng đường di chuyển."
      ],
      outcomes: [
        "Xây dựng thành công ứng dụng di động mượt mà đạt tỷ lệ phản hồi chạm dưới 100ms.",
        "Chuyển đổi thành công 100% bản vẽ Figma chi tiết thành mã nguồn React Native có tính tái sử dụng cao."
      ]
    },
    en: {
      overview: "A smart mobile ride-hailing app designed for passengers to book rides, track routes on interactive maps, and manage their trip history.",
      architecture: "React Native + Redux Toolkit + RESTful API integration + Figma prototype matching.",
      features: [
        "Highly fluid and responsive screens adapted beautifully to both iOS and Android viewports.",
        "Smart Address Book module allowing passengers to save, update, and search favorite locations.",
        "Google Maps APIs integration to calculate distances and display driver locations in real-time."
      ],
      outcomes: [
        "Successfully launched a responsive mobile client with a fast touch-response time under 100ms.",
        "Converted 100% of high-fidelity Figma vectors into clean, modular, and highly reusable React Native code."
      ]
    }
  },
  "BITB Corporate Website": {
    vi: {
      overview: "Website giới thiệu doanh nghiệp và các sản phẩm công nghệ của tập đoàn BITB, tích hợp kênh hỗ trợ trực tuyến thời gian thực giữa tổng đài và khách hàng.",
      architecture: "React.js + Tailwind CSS + Ant Design + Custom WebSocket Gateway.",
      features: [
        "Thiết kế hiện đại, responsive hoàn hảo cùng các hiệu ứng chuyển động lướt trang tinh tế.",
        "Tích hợp cổng kết nối WebSocket thời gian thực cho phép thực hiện các cuộc gọi thoại thoại (voice call) trực tuyến miễn phí giữa khách hàng và tư vấn viên.",
        "Trang giới thiệu sản phẩm tối ưu SEO tối đa giúp đạt điểm số cao trên Google Lighthouse."
      ],
      outcomes: [
        "Tăng tỷ lệ tương tác của khách hàng trên trang thêm 25% nhờ kênh gọi thoại WebSocket trực tuyến.",
        "Đạt điểm số SEO 98/100 trên công cụ Google PageSpeed Insights."
      ]
    },
    en: {
      overview: "The official corporate web portal showcasing BITB products and business technology, integrated with an online real-time helpline network.",
      architecture: "ReactJS + Tailwind CSS + Ant Design + Custom WebSocket Gateway.",
      features: [
        "Sleek and ultra-responsive layout layout featuring pixel-perfect components and animations.",
        "Real-time WebSocket tunnel enabling instant, free point-to-point voice calls between web users and customer service.",
        "SEO-optimized product catalog pages guaranteeing excellent search engine visibility."
      ],
      outcomes: [
        "Boosted online user engagement by 25% due to the integration of seamless WebSocket calling functionality.",
        "Achieved a top-tier SEO score of 98/100 on Google PageSpeed Insights."
      ]
    }
  },
  "VOSA Meeting Document Manager": {
    vi: {
      overview: "Hệ thống quản lý văn bản, tài liệu và phòng họp kỹ thuật số bảo mật cao phục vụ cho các tập đoàn cảng biển lớn trực thuộc Tổng công ty Hàng hải Việt Nam (VOSA, CANTHOPORT, VIMC).",
      architecture: "React.js + Java Spring Boot + JPA/Hibernate + MySQL + Liquibase DB Migrations + Docker.",
      features: [
        "Xử lý lưu trữ và phân tích văn bản đính kèm đa định dạng (Word, Excel, PDF) an toàn trên hệ thống.",
        "Quản lý lịch họp tự động gửi thông báo email nhắc lịch cho hội đồng quản trị.",
        "Quản trị nâng cấp cấu trúc cơ sở dữ liệu MySQL đồng bộ và an toàn thông qua các tập tin di chuyển Liquibase."
      ],
      outcomes: [
        "Giảm thời gian phản hồi của các API truy vấn văn bản từ 0.8 giây xuống còn 0.5 giây (tối ưu hóa 30% độ trễ hệ thống).",
        "Hỗ trợ triển khai đóng gói container Docker Compose nhanh chóng và nhất quán trên các máy chủ cục bộ của cảng."
      ]
    },
    en: {
      overview: "A highly secure digital board portal and document manager designed for shipping port conglomerates under the Vietnam Maritime Corporation.",
      architecture: "ReactJS + Java Spring Boot + JPA/Hibernate + MySQL + Liquibase DB Migrations + Docker.",
      features: [
        "Secure parsing, storage, and processing of multi-format meeting attachments (Word, Excel, PDF).",
        "Automated meeting scheduling module with instant email notification dispatches to board directors.",
        "Structured MySQL schema evolution managed via standardized Liquibase database migration scripts."
      ],
      outcomes: [
        "Reduced critical API query latency from 0.8s to 0.5s (achieving a significant 30% optimization).",
        "Containerized the entire application stack using Docker Compose for rapid, consistent bare-metal deployments."
      ]
    }
  }
};

// Premium 3D Interactive Tilting Project Card Component
const ProjectCard = ({ p, idx, onClick, t, revealItem, FolderGit2, ReactIcon, NextIcon, TailwindIcon, NestIcon, PostgreSQLIcon, DockerIcon, GitIcon, SpringIcon }: any) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angle = 8; // Max rotation angle
    setRotateX((yc - y) / yc * angle);
    setRotateY((x - xc) / xc * angle);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div 
      variants={revealItem}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d"
      }}
      className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] max-w-[390px] flex flex-col justify-between relative overflow-hidden group text-left bg-[#131520] card p-6 md:p-8 cursor-pointer active:scale-95 duration-100"
    >
      {/* Glow active border overlay */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        style={{ background: "var(--accent)" }}
      />

      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="project-tag mb-2.5">{p.role}</span>
            <h3 className="font-black text-lg md:text-xl leading-snug group-hover:text-[var(--accent)] transition-colors duration-200">
              {p.title}
            </h3>
          </div>
          <FolderGit2 className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: "var(--accent)", opacity: 0.8 }} />
        </div>
        
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6">
          {p.desc}
        </p>
      </div>

      <div className="pt-6 border-t border-white/5 mt-6">
        <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-2">
          {t("projects.techUsed")}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {p.tech.map((tch: string, ti: number) => (
            <span 
              key={ti} 
              className="text-[10px] font-mono px-2.5 py-1.5 rounded flex items-center gap-1 bg-[#111218] border border-white/5 text-slate-400"
            >
              {tch === "ReactJS" && <ReactIcon />}
              {tch.startsWith("NextJS") && <NextIcon />}
              {tch === "React Native" && <ReactIcon />}
              {tch === "Tailwind CSS" && <TailwindIcon />}
              {tch === "NestJS" && <NestIcon />}
              {tch === "PostgreSQL" && <PostgreSQLIcon />}
              {tch === "Docker" && <DockerIcon />}
              {tch === "Git" && <GitIcon />}
              {tch === "Java Spring Boot" && <SpringIcon />}
              <span>{tch}</span>
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const { language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [copiedText, setCopiedText] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const nav = useMemo(() => [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.contact"), href: "#contact" },
  ], [language, t]);

  // Render jobs in chronologically ascending order (past to present) exactly matching CV
  const rawJobs = t("experience.jobs") as any[];
  const jobs = useMemo(() => [...rawJobs].reverse(), [rawJobs]);

  const projects = useMemo(() => t("projects.items") as any[], [language, t]);

  // Dynamic Follow Cursor position tracking
  useEffect(() => {
    const touchCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touchCheck);

    if (touchCheck) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button'], .card, input");
      setCursorHovered(!!isInteractive);
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const item of nav) {
        const el = document.querySelector(item.href);
        if (el) {
          const top = (el as HTMLElement).offsetTop;
          const height = (el as HTMLElement).offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.href);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nav]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2000);
  };

  return (
    <div className="min-h-screen text-slate-100 selection:bg-blue-500/20 selection:text-white relative overflow-hidden" style={{ background: "var(--bg-dark)" }}>

      {/* ── CUSTOM IMMERSIVE TRAILING CURSOR (Desktop only) ── */}
      {!isTouchDevice && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[9999] mix-blend-difference hidden md:block"
            style={{ 
              borderColor: "var(--accent)", 
              x: mousePos.x - 16, 
              y: mousePos.y - 16,
            }}
            animate={{
              scale: cursorHovered ? 1.5 : 1,
              backgroundColor: cursorHovered ? "rgba(0, 136, 255, 0.15)" : "rgba(0, 136, 255, 0)"
            }}
            transition={{ type: "spring", stiffness: 250, damping: 28, mass: 0.6 }}
          />
          <motion.div
            className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
            style={{ 
              backgroundColor: "var(--accent)",
              x: mousePos.x - 3, 
              y: mousePos.y - 3 
            }}
            animate={{
              scale: cursorHovered ? 0.5 : 1
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        </>
      )}

      {/* ── BACKGROUND CYBERPUNK GRID & FLOATING ORBS ── */}
      <div className="absolute inset-0 grid-bg pointer-events-none z-0" />
      <div className="glow-orb glow-orb-orange pointer-events-none" />
      <div className="glow-orb glow-orb-cyan pointer-events-none" />

      {/* ── 1. NAVIGATION HEADER ── */}
      <header className="glass-nav fixed top-0 left-0 w-full z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group select-none">
            {/* Cyberpunk Glass Terminal Icon */}
            <div className="relative w-8 h-8 rounded-lg bg-black/60 border border-white/10 group-hover:border-[var(--accent)]/30 flex items-center justify-center overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-[var(--accent)]/10">
              {/* Terminal top operating window dots */}
              <div className="absolute top-[3px] left-[4px] right-[4px] flex gap-[3px]">
                <div className="w-[3px] h-[3px] rounded-full bg-rose-500/60" />
                <div className="w-[3px] h-[3px] rounded-full bg-amber-500/60" />
                <div className="w-[3px] h-[3px] rounded-full bg-emerald-500/60" />
              </div>
              {/* Prompt and Letter P */}
              <div className="font-mono text-[10px] font-black flex items-center pt-2 gap-[1px]">
                <span style={{ color: "var(--accent)" }} className="font-extrabold">{">"}</span>
                <span className="text-white">P</span>
                <span style={{ color: "var(--accent)" }} className="font-extrabold animate-console-blink -ml-[1px]">_</span>
              </div>
              {/* Reflection Shine sweep */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
            {/* Branding Typography */}
            <div className="flex flex-col items-start leading-none text-left">
              <span className="text-white font-black text-sm md:text-base tracking-wider uppercase group-hover:text-slate-200 transition-colors">
                PHAM THEANH
              </span>
              <span className="text-[8px] font-mono font-bold tracking-widest uppercase mt-1" style={{ color: "var(--accent)" }}>
                FULLSTACK DEV
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {nav.map(n => (
              <a 
                key={n.href} 
                href={n.href} 
                className={`text-xs font-mono font-semibold tracking-widest uppercase transition-all duration-200 ${
                  activeSection === n.href ? "text-[var(--accent)]" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* Nav Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector */}
            <button 
              onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
              className="flex items-center justify-center gap-1.5 px-4 h-9 rounded border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-mono font-bold tracking-widest text-slate-300 uppercase cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
              {language === "vi" ? "ENGLISH" : "TIẾNG VIỆT"}
            </button>

            {/* Quick Resume Download */}
            <a 
              href="Fullstack Developer_Phạm Thế Anh.pdf" 
              download="Fullstack Developer_Phạm Thế Anh.pdf" 
              className="flex items-center justify-center gap-1.5 px-4 h-9 rounded bg-[var(--accent)] hover:bg-[var(--accent-hover)] hover:-translate-y-[1px] transition-all text-xs font-mono font-bold tracking-widest text-white uppercase cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> 
              {t("nav.cv")}
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <button 
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: "auto", opacity: 1 }} 
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden px-6 pb-6 flex flex-col gap-4 shadow-xl" 
              style={{ background: "var(--bg-dark)", borderTop: "1px solid var(--border)" }}
            >
              {nav.map(n => (
                <a 
                  key={n.href} 
                  href={n.href} 
                  onClick={() => setMenuOpen(false)}
                  className={`py-3 text-sm font-semibold tracking-wider uppercase border-b border-white/5 transition-colors ${
                    activeSection === n.href ? "text-[var(--accent)]" : "text-slate-400"
                  }`}
                >
                  {n.label}
                </a>
              ))}
              <div className="flex gap-4 pt-2">
                <button 
                  onClick={() => { setLanguage(language === "vi" ? "en" : "vi"); setMenuOpen(false); }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded border border-white/10 bg-white/5 text-sm font-bold font-mono text-slate-300"
                >
                  <Globe className="w-4 h-4" style={{ color: "var(--accent)" }} />
                  {language === "vi" ? "ENGLISH" : "TIẾNG VIỆT"}
                </button>
                <a 
                  href="Fullstack Developer_Phạm Thế Anh.pdf" 
                  download="Fullstack Developer_Phạm Thế Anh.pdf" 
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 btn-accent text-sm text-center justify-center py-3"
                >
                  <Download className="w-4 h-4" /> {t("nav.cv")}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── 2. HERO SECTION ── */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex flex-col justify-center relative overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm font-mono font-bold tracking-widest uppercase mb-4" 
              style={{ color: "var(--text-muted)" }}
            >
              {t("hero.greeting")}
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-none"
            >
              {language === "vi" ? "Tôi là " : "I'm "}
              <span className="text-white block sm:inline">{language === "vi" ? "Phạm Thế Anh" : "Pham The Anh"}</span>
              <span style={{ color: "var(--accent)" }} className="inline-block animate-pulse">.</span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="section-line" />
              <span className="font-mono text-xs uppercase tracking-widest font-bold" style={{ color: "var(--accent)" }}>
                {t("hero.role")}
              </span>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-slate-400 text-base md:text-lg leading-relaxed mb-10 max-w-2xl"
            >
              {t("hero.intro")}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <a href="#contact" className="btn-accent px-8 py-3.5 text-center justify-center font-mono tracking-widest uppercase">
                {language === "vi" ? "LIÊN HỆ TÔI" : "GET IN TOUCH"}
              </a>
              <a href="Fullstack Developer_Phạm Thế Anh.pdf" download="Fullstack Developer_Phạm Thế Anh.pdf" className="btn-outline px-8 py-3.5 text-center justify-center font-mono tracking-widest uppercase">
                <Download className="w-4 h-4" /> {language === "vi" ? "TẢI XUỐNG CV" : "MY RESUME"}
              </a>
            </motion.div>
          </div>

          {/* Hero Right Column – Elegant Avatar with floating arrows */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center"
            >
              {/* Outer rotated thin border ring */}
              <div 
                className="absolute inset-0 rounded-full border border-dashed animate-[spin_40s_linear_infinite]" 
                style={{ borderColor: "var(--accent)", opacity: 0.15, transform: "scale(1.2)" }} 
              />
              
              {/* Offset glowing ring */}
              <div 
                className="absolute inset-2 rounded-full border-2" 
                style={{ borderColor: "var(--accent)", opacity: 0.4, transform: "rotate(45deg)" }} 
              />
              
              {/* Solid inner border ring */}
              <div 
                className="absolute inset-5 rounded-full border" 
                style={{ borderColor: "var(--border)", opacity: 0.8 }} 
              />

              {/* Parallax / Floating Arrow Decors */}
              <motion.span 
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="angle-bracket absolute left-[-20px] top-1/2 -translate-y-1/2 select-none"
              >
                {"<"}
              </motion.span>
              <motion.span 
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="angle-bracket absolute right-[-20px] top-1/2 -translate-y-1/2 select-none"
              >
                {">"}
              </motion.span>

              {/* Main Avatar container */}
              <div 
                className="w-[84%] h-[84%] rounded-full overflow-hidden relative shadow-2xl transition-transform duration-300 hover:scale-[1.02]" 
                style={{ background: "var(--bg-card)", border: "4px solid var(--accent)" }}
              >
                <Image 
                  src="/CV.jpg" 
                  alt="Phạm Thế Anh Profile Avatar" 
                  fill 
                  priority
                  className="object-cover transition-all duration-500 hover:scale-105" 
                />
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── 3. SKILLS TICKER / MARQUEE ── */}
      <div className="ticker-wrapper relative z-25">
        <div className="ticker-inner">
          {[...skillsList, ...skillsList].map((skill, index) => (
            <span key={index} className="ticker-item font-mono">
              <span className="ticker-dot" />
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* ── 4. ABOUT ME SECTION WITH COMPONENT SCROLL-REVEALS ── */}
      <section id="about" className="py-28 max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interconnected Services list with timeline connectors */}
          <motion.div 
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 relative text-left"
          >
            <motion.div variants={revealItem} className="mb-8">
              <p className="text-xs font-mono font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--accent)" }}>
                {language === "vi" ? "DỊCH VỤ" : "SERVICES"}
              </p>
              <h3 className="text-xl font-black text-white">
                {language === "vi" ? "MẢNG PHÁT TRIỂN CHUYÊN SÂU" : "WHAT I SPECIALIZE IN"}
              </h3>
            </motion.div>

            {/* Vertical interconnected service list */}
            <div className="relative pl-6 space-y-6">
              {/* Vertical connecting line */}
              <div 
                className="absolute left-[7px] top-[14px] bottom-[14px] w-[2px]" 
                style={{ background: "linear-gradient(to bottom, var(--accent), var(--border) 80%)", opacity: 0.4 }}
              />

              {[
                { label: language === "vi" ? "Phát Triển Frontend" : "Frontend Development", desc: language === "vi" ? "Xây dựng các giao diện web mượt mà, trực quan và responsive hoàn đối." : "Building modular, highly responsive interactive web interfaces." },
                { label: language === "vi" ? "Thiết Kế Backend & API" : "Backend & API Design", desc: language === "vi" ? "Phát triển các API Spring Boot/NestJS bảo mật, hiệu năng cao và phân quyền tối ưu." : "Crafting clean and robust RESTful APIs with structured role authorization." },
                { label: language === "vi" ? "Cơ Sở Dữ Liệu & DevOps" : "Database & DevOps", desc: language === "vi" ? "Thiết kế, tối ưu câu lệnh SQL và đóng gói môi trường ảo hóa bằng Docker." : "Optimizing database schemas and containerizing host environments with Docker." }
              ].map((s, i) => (
                <div key={i} className="relative">
                  {/* Glowing Node Dot (Fixed outside, aligned with the vertical line) */}
                  <div 
                    className="absolute left-[-21px] top-[24px] w-2.5 h-2.5 rounded-full border z-10"
                    style={{ background: "var(--bg-dark)", borderColor: "var(--accent)", borderWidth: "2px" }}
                  />
                  <motion.div 
                    variants={revealItem}
                    className="relative flex flex-col items-start gap-1 p-5 rounded-lg border transition-all duration-300"
                    style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                    whileHover={{ borderColor: "rgba(0, 136, 255, 0.2)", x: 4 }}
                  >
                    <h4 className="font-bold text-sm text-slate-100">{s.label}</h4>
                    <p className="text-xs text-slate-400 mt-1">{s.desc}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Bio summary, Large Stats and Education Card */}
          <motion.div 
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 flex flex-col justify-start text-left"
          >
            <motion.p variants={revealItem} className="text-xs font-mono font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--accent)" }}>
              {language === "vi" ? "THÔNG TIN" : "ABOUT ME"}
            </motion.p>
            <motion.h2 variants={revealItem} className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
              {t("about.title")}
            </motion.h2>
            <motion.span variants={revealItem} className="section-line mb-8 block" />
            
            <motion.div variants={revealItem} className="space-y-4 text-slate-400 text-sm md:text-base leading-relaxed mb-10">
              <p>{t("about.text1")}</p>
              <p>{t("about.text2")}</p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              variants={revealContainer}
              className="grid grid-cols-3 gap-6 mb-10 py-8" 
              style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
            >
              {[
                { val: "5", suf: "+", lbl: language === "vi" ? "Dự Án Hoàn Thành" : "Completed Projects" },
                { val: "2", suf: "+", lbl: language === "vi" ? "Năm Kinh Nghiệm" : "Years Experience" },
                { val: "3.13", suf: "", lbl: language === "vi" ? "GPA Điểm Học Tập" : "Academic GPA" }
              ].map((stat, idx) => (
                <motion.div key={idx} variants={revealItem} className="flex flex-col items-center text-center">
                  <span className="stat-number flex items-baseline gap-0.5">
                    {stat.val}
                    <span className="stat-plus">{stat.suf}</span>
                  </span>
                  <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-slate-500 mt-2 leading-tight">
                    {stat.lbl}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Structured Education Card */}
            <motion.div 
              variants={scaleReveal}
              className="flex gap-4 items-center p-6 rounded-xl transition-all duration-300 hover:border-slate-700 border" 
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--accent-light)", color: "var(--accent)" }}
              >
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm md:text-base text-slate-200">{t("about.school")}</p>
                <p className="text-xs md:text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                  {t("about.major")} · <span style={{ color: "var(--accent)" }} className="font-bold">{t("about.gpa")}</span>
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ── 5. PROFESSIONAL HORIZONTAL TIMELINE EXPERIENCE SECTION WITH SCROLL REVEALS ── */}
      <section id="experience" className="py-28 relative z-10" style={{ background: "var(--bg-card)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center mb-16 text-center"
          >
            <p className="text-xs font-mono font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--accent)" }}>
              {language === "vi" ? "LỘ TRÌNH" : "JOURNEY"}
            </p>
            <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">{t("experience.title")}</h2>
            <div className="h-1 w-16 bg-[var(--accent)] mt-4 rounded-full"></div>
          </motion.div>

          {/* Genuine horizontal timeline layout */}
          <div className="relative pt-20 pb-4">
            
            {/* Visual horizontal axis line connecting the timeline nodes (Desktop only with scaleX build-in) */}
            <div className="absolute top-[49px] left-[15%] right-[15%] h-[2px] hidden lg:block" style={{ background: "rgba(255,255,255,0.06)" }}>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                className="w-full h-full bg-gradient-to-r from-[var(--accent)] via-[var(--accent)] to-transparent opacity-80 origin-left" 
              />
            </div>

            {/* Visual mốc thời gian nodes above cards */}
            <motion.div 
              variants={revealContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-start relative"
            >
              {jobs.map((job: any, idx: number) => {
                return (
                  <motion.div 
                    key={idx}
                    variants={revealItem}
                    className="flex flex-col relative text-left group"
                  >
                    {/* Visual Glowing Time-Marker Node Dot on the horizontal line */}
                    <div className="hidden lg:flex flex-col items-center absolute top-[-64px] left-1/2 -translate-x-1/2 w-full">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 mb-2 group-hover:text-[var(--accent)] transition-colors">
                        {job.period}
                      </span>
                      <div 
                        className="w-5 h-5 rounded-full border-4 flex items-center justify-center bg-[#111218] transition-all duration-300 group-hover:scale-125"
                        style={{ borderColor: "var(--accent)" }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
                      </div>
                      {/* Vertical connector line linking node down to the card */}
                      <div className="w-[1px] h-[33px] border-l border-dashed border-[var(--accent)]/40 mt-[2px]" />
                    </div>

                    {/* Timeline Card */}
                    <div className="card p-6 md:p-8 flex flex-col justify-between relative bg-slate-900/40 hover:border-[var(--accent)]/40 transition-all duration-300 min-h-[380px]">
                      
                      {/* Header containing mobile period badge */}
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-[var(--accent-light)] text-[var(--accent)] lg:hidden">
                          {job.period}
                        </span>
                        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                          {job.codeFile}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-black text-slate-100 group-hover:text-[var(--accent)] transition-colors duration-200">
                          {job.role}
                        </h3>
                        <p className="text-xs font-bold text-slate-400 mt-1.5 mb-5 uppercase tracking-wide">
                          {job.company}
                        </p>

                        <ul className="space-y-3">
                          {job.bullets.map((bullet: string, bIdx: number) => (
                            <li key={bIdx} className="flex gap-2.5 text-xs md:text-sm leading-relaxed text-slate-400">
                              <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* ── 6. DETAILED SKILLS GRID SECTION WITH VIEWPORT REVEALS ── */}
      <section id="skills" className="py-28 max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <p className="text-xs font-mono font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--accent)" }}>
            {language === "vi" ? "KỸ NĂNG" : "EXPERTISE"}
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">{t("skills.title")}</h2>
          <div className="h-1 w-16 bg-[var(--accent)] mt-4 rounded-full"></div>
        </motion.div>

        <motion.div 
          variants={revealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { 
              title: t("skills.categories.frontend"), 
              logo: <ReactCategoryIcon />,
              items: [
                { name: "ReactJS", highlight: true, logo: <ReactIcon /> },
                { name: "NextJS", highlight: true, logo: <NextIcon /> },
                { name: "React Native", highlight: false, logo: <ReactIcon /> },
                { name: "TailwindCSS", highlight: false, logo: <TailwindIcon /> },
                { name: "Ant Design", highlight: false }
              ]
            },
            { 
              title: t("skills.categories.backend"), 
              logo: <NestCategoryIcon />,
              items: [
                { name: "Spring Boot", highlight: true, logo: <SpringIcon /> },
                { name: "NestJS", highlight: true, logo: <NestIcon /> },
                { name: "RESTful API", highlight: false },
                { name: "WebSocket", highlight: false }
              ]
            },
            { 
              title: t("skills.categories.database"), 
              logo: <PostgreSQLCategoryIcon />,
              items: [
                { name: "PostgreSQL", highlight: true, logo: <PostgreSQLIcon /> },
                { name: "MySQL", highlight: false },
                { name: "MongoDB", highlight: false }
              ]
            },
            { 
              title: t("skills.categories.devops"), 
              logo: <DockerCategoryIcon />,
              items: [
                { name: "Docker", highlight: true, logo: <DockerIcon /> },
                { name: "Git / GitHub", highlight: false, logo: <GitIcon /> },
                { name: "Postman", highlight: false },
                { name: "Liquibase", highlight: false }
              ]
            },
          ].map((cat, idx) => (
            <motion.div 
              key={idx} 
              variants={revealItem}
              className="card p-6 flex flex-col justify-between hover:scale-[1.02] hover:border-[var(--accent)]/30 duration-300 group text-left"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-5 pb-3 border-b border-white/5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-[var(--accent)]/30 group-hover:bg-[var(--accent-light)] transition-all duration-300">
                    {cat.logo}
                  </div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill, si) => (
                    <span 
                      key={si} 
                      className={`text-xs font-mono font-semibold px-2.5 py-1.5 rounded transition-all duration-200 flex items-center gap-1.5 ${
                        skill.highlight ? "border-[var(--accent)] text-white bg-[var(--accent-light)]" : "bg-[var(--bg-dark)] border-[var(--border)] text-slate-400"
                      }`}
                      style={{ borderWidth: "1px" }}
                    >
                      {skill.logo && skill.logo}
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── 7. EXPANDED PROJECTS GRID SECTION WITH SPRING VIEWPORT REVEALS ── */}
      <section id="projects" className="py-28 relative z-10" style={{ background: "var(--bg-card)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center mb-16 text-center"
          >
            <p className="text-xs font-mono font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--accent)" }}>
              {language === "vi" ? "SẢN PHẨM" : "PORTFOLIO"}
            </p>
            <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">{t("projects.title")}</h2>
            <div className="h-1 w-16 bg-[var(--accent)] mt-4 rounded-full"></div>
          </motion.div>

          {/* Flexible Flexbox grid that automatically centers the 2 cards on the second row */}
          <motion.div 
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap justify-center gap-8"
          >
            {projects.map((p: any, idx: number) => (
              <ProjectCard 
                key={idx}
                p={p}
                idx={idx}
                onClick={() => setSelectedProject(p)}
                t={t}
                revealItem={revealItem}
                FolderGit2={FolderGit2}
                ReactIcon={ReactIcon}
                NextIcon={NextIcon}
                TailwindIcon={TailwindIcon}
                NestIcon={NestIcon}
                PostgreSQLIcon={PostgreSQLIcon}
                DockerIcon={DockerIcon}
                GitIcon={GitIcon}
                SpringIcon={SpringIcon}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 8. GET IN TOUCH SECTION WITH ANIMATED CONTACT INFO CARDS ── */}
      <section id="contact" className="py-28 max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <p className="text-xs font-mono font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--accent)" }}>
            {language === "vi" ? "LIÊN HỆ" : "GET IN TOUCH"}
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">{t("contact.title")}</h2>
          <div className="h-1 w-16 bg-[var(--accent)] mt-4 rounded-full"></div>
        </motion.div>

        {/* Dynamic Connected Contacts Card Grid */}
        <div className="max-w-4xl mx-auto">
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-400 text-center max-w-2xl mx-auto mb-12 text-sm md:text-base"
          >
            {t("contact.subtitle")}
          </motion.p>

          <motion.div 
            variants={revealContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              { icon: <Phone className="w-5 h-5" />, label: language === "vi" ? "ĐIỆN THOẠI" : "PHONE", value: "0393083263", actionLabel: "Copy text" },
              { icon: <Mail className="w-5 h-5" />, label: language === "vi" ? "THƯ ĐIỆN TỬ" : "EMAIL", value: "phama5024@gmail.com", actionLabel: "Copy email" },
              { icon: <MapPin className="w-5 h-5" />, label: language === "vi" ? "VỊ TRÍ" : "LOCATION", value: t("contact.location"), actionLabel: "Map location" },
            ].map((item, idx) => (
              <motion.button 
                key={idx}
                variants={revealItem}
                onClick={() => copyToClipboard(item.value, item.actionLabel)}
                whileHover={{ y: -5 }}
                className="card p-6 flex flex-col items-center justify-center text-center cursor-pointer border hover:border-[var(--accent)]/50 transition-all duration-300 relative group"
              >
                <div className="service-icon mb-4 w-12 h-12 rounded-full" style={{ background: "var(--accent-light)" }}>
                  {item.icon}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
                  {item.label}
                </span>
                <span className="font-bold text-slate-200 text-sm md:text-base break-all">
                  {item.value}
                </span>
                
                {/* Active copy bubble indicator */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[9px] font-mono text-[var(--accent)] bg-[var(--accent-light)] px-1.5 py-0.5 rounded">
                  {copiedText === item.actionLabel ? (language === "vi" ? "Đã sao chép!" : "Copied!") : (language === "vi" ? "Click để copy" : "Click to copy")}
                </div>
              </motion.button>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── CUSTOM NOISE TEXTURE OVERLAY (Premium Film Grain) ── */}
      <div className="noise-overlay" />

      {/* ── 9. FOOTER SECTION ── */}
      <footer className="py-10 text-center text-xs font-mono" style={{ borderTop: "1px solid var(--border)", color: "var(--text-muted)" }}>
        <p>&copy; {new Date().getFullYear()} Phạm Thế Anh. All rights reserved.</p>
        <p className="mt-2 text-[10px] text-slate-700">Designed & built using Next.js 15, Tailwind CSS & Framer Motion.</p>
      </footer>

      {/* ── 10. DYNAMIC DETAILED PROJECT MODAL (AnimatePresence) ── */}
      <AnimatePresence>
        {selectedProject && (() => {
          const details = projectDetails[selectedProject.title]?.[language as "vi" | "en"];
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 backdrop-blur-md bg-black/70"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#131520] border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[var(--accent)] hover:border-[var(--accent)] text-slate-300 hover:text-white transition-all duration-300 z-10 group"
                >
                  <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Modal Header */}
                <div className="border-b border-white/5 pb-6 mb-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="project-tag">{selectedProject.role}</span>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                      {selectedProject.period}
                    </span>
                  </div>
                  <h3 className="font-black text-2xl md:text-3xl text-white tracking-tight">
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Modal Scrollable Content */}
                <div className="space-y-6 flex-1 pr-1">
                  {/* Overview */}
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-2">
                      {language === "vi" ? "Tổng Quan Dự Án" : "Project Overview"}
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {details?.overview || selectedProject.desc}
                    </p>
                  </div>

                  {/* Tech stack & Architecture details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-2">
                        {language === "vi" ? "Kiến trúc hệ thống" : "System Architecture"}
                      </h4>
                      <p className="text-xs font-mono text-[var(--accent)] bg-[var(--accent-light)] border border-[var(--accent)]/20 px-3 py-2 rounded-lg leading-relaxed">
                        {details?.architecture || "React + REST Backend APIs + Relational Database."}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-2">
                        {t("projects.techUsed")}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.tech.map((tch: string, ti: number) => (
                          <span
                            key={ti}
                            className="text-[10px] font-mono px-2.5 py-1.5 rounded flex items-center gap-1 bg-[#111218] border border-white/5 text-slate-400"
                          >
                            {tch === "ReactJS" && <ReactIcon />}
                            {tch.startsWith("NextJS") && <NextIcon />}
                            {tch === "React Native" && <ReactIcon />}
                            {tch === "Tailwind CSS" && <TailwindIcon />}
                            {tch === "NestJS" && <NestIcon />}
                            {tch === "PostgreSQL" && <PostgreSQLIcon />}
                            {tch === "Docker" && <DockerIcon />}
                            {tch === "Git" && <GitIcon />}
                            {tch === "Java Spring Boot" && <SpringIcon />}
                            <span>{tch}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Core Features */}
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-2.5">
                      {language === "vi" ? "Các Tính Năng Cốt Lõi" : "Key Core Features"}
                    </h4>
                    <ul className="space-y-2.5">
                      {(details?.features || selectedProject.keyPoints).map((f: string, fi: number) => (
                        <li key={fi} className="flex gap-2.5 text-xs md:text-sm leading-relaxed text-slate-300 font-normal">
                          <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key outcomes / achievements */}
                  {details?.outcomes && (
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-2.5">
                        {language === "vi" ? "Kết Quả & Thành Tích" : "Outcomes & Key Achievements"}
                      </h4>
                      <ul className="space-y-2.5">
                        {details.outcomes.map((o: string, oi: number) => (
                          <li key={oi} className="flex gap-2.5 text-xs md:text-sm leading-relaxed text-slate-300 font-normal">
                            <span className="flex-shrink-0 mt-1 text-emerald-400">✓</span>
                            <span className="text-slate-300">{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}
