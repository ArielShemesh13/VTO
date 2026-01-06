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
          }`}>
            נתונים וויזואליזציות
          </p>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-[#141225]'
          }`}>
            ניתוח{' '}
            <span className={`${
              isDark 
                ? 'bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400' 
                : 'bg-gradient-to-r from-[#244270] to-[#4dbdce]'
            } bg-clip-text text-transparent`}>
              מתקפות
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto ${
            isDark ? 'text-white/60' : 'text-[#141225]/60'
          }`}>
            נתונים סטטיסטיים ומקרים אמיתיים של מתקפות SIM SWAP ברחבי העולם
          </p>
        </motion.div>

        {/* Attack Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-2xl ${
              isDark 
                ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30' 
                : 'bg-gradient-to-br from-red-50 to-orange-50 border border-red-200'
            } backdrop-blur-xl text-center`}
          >
            <h3 className={`text-4xl font-bold mb-2 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
              $33M
            </h3>
            <p className={`${isDark ? 'text-white/80' : 'text-[#141225]/80'}`}>
              שוד הקריפטו הגדול - T-Mobile
            </p>
            <p className={`text-sm mt-2 ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
              במקרה בורגרת פרטי, חייבה T-Mobile לשלם 33 מיליון דולר ללקוח שאיבד קריפטו בגין שווי 38 מיליון דולר
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`p-8 rounded-2xl ${
              isDark 
                ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30' 
                : 'bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200'
            } backdrop-blur-xl text-center`}
          >
            <h3 className={`text-4xl font-bold mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
              X/Twitter
            </h3>
            <p className={`${isDark ? 'text-white/80' : 'text-[#141225]/80'}`}>
              השתלטות על חשבון מנכ״ל טוויטר
            </p>
            <p className={`text-sm mt-2 ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
              אפילו הגברים ביותר פגיעים. חשבון הטוויטר של ג׳ק דורסי, מייסד X, נפרץ באוגוסט 2019 באמצעות מתקפת SIM SWAP
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`p-8 rounded-2xl ${
              isDark 
                ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30' 
                : 'bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200'
            } backdrop-blur-xl text-center`}
          >
            <h3 className={`text-4xl font-bold mb-2 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
              17+
            </h3>
            <p className={`${isDark ? 'text-white/80' : 'text-[#141225]/80'}`}>
              החולשה המערכתית
            </p>
            <p className={`text-sm mt-2 ${isDark ? 'text-white/60' : 'text-[#141225]/60'}`}>
              מחקר של אוניברסיטת פרינסטון חשף כי 17+ אתרים וסייעווים מקווים פופולריים, מתקפת SIM SWAP הספיקה לבדה כדי להשתלט באופן מלא על חשבון המשתמש
            </p>
          </motion.div>
        </div>

        {/* Security Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-8 rounded-2xl ${
            isDark 
              ? 'bg-black/40 border border-purple-500/20' 
              : 'bg-white/60 border border-[#244270]/10'
          } backdrop-blur-xl`}
        >
          <h3 className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-white' : 'text-[#141225]'}`}>
            השוואת שיטות אבטחה
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-xl ${isDark ? 'bg-red-500/10 border border-red-500/30' : 'bg-red-50 border border-red-200'}`}>
              <h4 className={`font-bold mb-3 text-lg ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                ❌ אימות ספקים חלש ומיושן
              </h4>
              <ul className={`space-y-2 text-sm ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
                <li>• הבדיקה תלויה בעובד ספקנים</li>
                <li>• פרטי תשלום אחרון מנוצל עליהם</li>
                <li>• אין ספקנים לשינוי בלקלות</li>
                <li>• יכולים 'לשחול' מידע על ידי ביצוע תשלום קטן</li>
              </ul>
            </div>
            <div className={`p-6 rounded-xl ${isDark ? 'bg-green-500/10 border border-green-500/30' : 'bg-green-50 border border-green-200'}`}>
              <h4 className={`font-bold mb-3 text-lg ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                ✅ אימות דו-שלבי מגבסס SMS חופר
              </h4>
              <ul className={`space-y-2 text-sm ${isDark ? 'text-white/70' : 'text-[#141225]/70'}`}>
                <li>• SMS נשלח לקוחי האימות שלחים יישירות</li>
                <li>• ברגע שה-SIM מוחלף, אימות דו-שלבי (2FA) בצעמתמש SMS הופך מכלי הגנת לכלי נשק</li>
                <li>• כל קודי האימות נשלחים ישירות אליו</li>
                <li>• המכון הלאומי לתקנים טכנולוגיה של ארה״ב (NIST) החיר מפני הסיכונים של אימות מבוסס SMS</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}