import React from 'react';
import { motion } from 'framer-motion';

export default function FinanceSection({ isDark }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className={`text-sm tracking-[0.3em] uppercase mb-4 ${
            isDark ? 'text-purple-400' : 'text-[#244270]'
          }`} dir="rtl">
            ניתוח וסיכום
          </p>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-[#141225]'
          }`} dir="rtl">
            סיכום{' '}
            <span className={`${
              isDark 
                ? 'bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400' 
                : 'bg-gradient-to-r from-[#244270] to-[#4dbdce]'
            } bg-clip-text text-transparent`}>
              הפתרון
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto ${
            isDark ? 'text-white/60' : 'text-[#141225]/60'
          }`} dir="rtl">
            פתרון #222222 מציע גישה חדשנית לאבטחת תהליכי SIM SWAP ומגן על המשתמשים מפני איומי סייבר מתקדמים
          </p>
        </motion.div>

        {/* Content Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-center p-12 rounded-2xl ${
            isDark 
              ? 'bg-black/40 border border-purple-500/20' 
              : 'bg-white/60 border border-[#244270]/10'
          } backdrop-blur-xl`}
          dir="rtl"
        >
          <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            פרדיגמה חדשה: גוף אימות חיצוני כסטנדרט לאומי
          </h3>
          <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
            אנו מציעים להקים גוף אימות חיצוני ומאושר שישמש כשומר סף. לפני שחברת סלולר תבצע פעולה רגישה כמו החלפת SIM, היא תחייב לקבל 'אור ירוק' מגוף זה, המבצע אימות זהות חזק ובזמן אמת. הפתרון מבוסס על מערכת 'יעילה משולשת':
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-purple-500/10' : 'bg-[#244270]/10'}`}>
              <h4 className={`font-bold mb-2 ${isDark ? 'text-purple-300' : 'text-[#244270]'}`}>
                קריאת עוסדת זהות ביומטרית
              </h4>
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
                סריקה מאובטחת של תעודת זהות, הזהות הישראלית הביומטרית. מוודא שהמסמך פיזית נכון, מקורי ותקף
              </p>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-cyan-500/10' : 'bg-[#4dbdce]/10'}`}>
              <h4 className={`font-bold mb-2 ${isDark ? 'text-cyan-300' : 'text-[#4dbdce]'}`}>
                זיהוי פנים ביומטרי חי (Liveness Detection)
              </h4>
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
                שימוש בווידאו או תמי כדי לוודא שהאדם העומד מול המצלמה הוא אדם אמיתי ולא תמונה, וידאו או מסיכה
              </p>
            </div>
            <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-500/10' : 'bg-[#244270]/10'}`}>
              <h4 className={`font-bold mb-2 ${isDark ? 'text-blue-300' : 'text-[#244270]'}`}>
                חיבור מאובטח לספקיות (Secure API)
              </h4>
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
                לאחר השלמת האימות החד-שלבי, המערכת שולחת אישור דיגיטלי חתום ומאובטח לחברת הסלולר דרך API ישיר
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}