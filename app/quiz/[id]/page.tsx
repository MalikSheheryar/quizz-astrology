// "use client"

// import React, { useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ArrowLeft, Star, Heart, Hash, Moon, Sparkles } from 'lucide-react';
// import { FloatingElements } from '@/components/floating-elements';

// const questionVariants = {
//   enter: { opacity: 0, x: 50, scale: 0.9 },
//   center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
//   exit: { opacity: 0, x: -50, scale: 0.9, transition: { duration: 0.3, ease: "easeIn" } },
// };

// const optionVariants = {
//   hidden: { opacity: 0, y: 20, scale: 0.9 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       delay: i * 0.1,
//       duration: 0.4,
//       ease: "easeOut",
//     },
//   }),
// };

// export default function QuizPage() {
//   const params = useParams();
//   const id = params.id as string;
//   const router = useRouter();
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState<{ [key: number]: string }>({});
//   const [showResult, setShowResult] = useState(false);

//   const quizData = {
//     1: {
//       title: "What's Your Zodiac Personality?",
//       category: "Astrology",
//       icon: Star,
//       gradient: "from-purple-600 via-indigo-600 to-blue-600",
//       questions: [
//         {
//           question: "What's your ideal way to spend a weekend?",
//           options: [
//             { text: "Hosting a party with friends", value: "fire" },
//             { text: "Relaxing at home with a book", value: "earth" },
//             { text: "Exploring a new place", value: "air" },
//             { text: "Having deep conversations", value: "water" }
//           ]
//         },
//         {
//           question: "How do you handle conflict?",
//           options: [
//             { text: "Face it head-on with passion", value: "fire" },
//             { text: "Think it through carefully first", value: "earth" },
//             { text: "Try to find a compromise", value: "air" },
//             { text: "Follow your intuition", value: "water" }
//           ]
//         },
//         {
//           question: "What motivates you most?",
//           options: [
//             { text: "Achievement and recognition", value: "fire" },
//             { text: "Security and stability", value: "earth" },
//             { text: "Knowledge and connection", value: "air" },
//             { text: "Emotional fulfillment", value: "water" }
//           ]
//         }
//       ],
//       results: {
//         fire: { title: "Fire Sign Energy", description: "You have the passionate, dynamic energy of Aries, Leo, or Sagittarius. You're a natural leader who loves adventure and isn't afraid to take risks." },
//         earth: { title: "Earth Sign Stability", description: "You embody the grounded, practical nature of Taurus, Virgo, or Capricorn. You value security, hard work, and building lasting foundations." },
//         air: { title: "Air Sign Intelligence", description: "You possess the intellectual, communicative qualities of Gemini, Libra, or Aquarius. You love ideas, social connections, and mental stimulation." },
//         water: { title: "Water Sign Intuition", description: "You have the emotional depth and intuition of Cancer, Scorpio, or Pisces. You're highly empathetic and guided by your feelings." }
//       }
//     },
//     2: {
//       title: "Love Compatibility Test",
//       category: "Love",
//       icon: Heart,
//       gradient: "from-pink-500 via-rose-500 to-red-500",
//       questions: [
//         {
//           question: "What's most important in a relationship?",
//           options: [
//             { text: "Passion and excitement", value: "passionate" },
//             { text: "Trust and loyalty", value: "stable" },
//             { text: "Intellectual connection", value: "mental" },
//             { text: "Emotional intimacy", value: "emotional" }
//           ]
//         },
//         {
//           question: "How do you show love?",
//           options: [
//             { text: "Through grand gestures", value: "passionate" },
//             { text: "Through consistent actions", value: "stable" },
//             { text: "Through meaningful conversations", value: "mental" },
//             { text: "Through emotional support", value: "emotional" }
//           ]
//         },
//         {
//           question: "What's your ideal date?",
//           options: [
//             { text: "Adventure or spontaneous trip", value: "passionate" },
//             { text: "Cozy dinner at home", value: "stable" },
//             { text: "Museum or cultural event", value: "mental" },
//             { text: "Quiet walk and deep talks", value: "emotional" }
//           ]
//         }
//       ],
//       results: {
//         passionate: { title: "Passionate Lover", description: "You crave intensity and excitement in love. You're drawn to partners who can match your energy and aren't afraid of deep emotions." },
//         stable: { title: "Loyal Partner", description: "You value consistency and commitment. You're looking for someone who will be your rock through life's ups and downs." },
//         mental: { title: "Intellectual Companion", description: "Mental connection is key for you. You need a partner who can engage in stimulating conversations and share your interests." },
//         emotional: { title: "Empathetic Soul", description: "Emotional depth and understanding are your priorities. You seek someone who can connect with you on a profound emotional level." }
//       }
//     }
//   };

//   const quiz = quizData[id as keyof typeof quizData] || quizData[1];
//   const Icon = quiz.icon;
//   const totalQuestions = quiz.questions.length;
//   const progress = ((currentQuestion + 1) / totalQuestions) * 100;

//   const handleAnswer = (value: string) => {
//     setAnswers({ ...answers, [currentQuestion]: value });

//     if (currentQuestion < totalQuestions - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       setTimeout(() => setShowResult(true), 500);
//     }
//   };

//   const getResult = () => {
//     const answerValues = Object.values(answers);
//     const counts: { [key: string]: number } = {};
//     answerValues.forEach(value => {
//       counts[value] = (counts[value] || 0) + 1;
//     });
//     const topResult = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b), Object.keys(quiz.results)[0]);
//     return quiz.results[topResult as keyof typeof quiz.results] || quiz.results[Object.keys(quiz.results)[0] as keyof typeof quiz.results];
//   };

//   const resetQuiz = () => {
//     setCurrentQuestion(0);
//     setAnswers({});
//     setShowResult(false);
//   };

//   return (
//     <div className="min-h-screen relative">
//       <FloatingElements />

//       <div className="max-w-5xl mx-auto px-4 py-12 relative z-10">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="mb-12"
//         >
//           <motion.button
//             whileHover={{ x: -5, scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => router.back()}
//             className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-8 transition-all duration-300 font-semibold"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Back to Category
//           </motion.button>

//           <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
//             {/* Background decoration */}
//             <div className="absolute top-0 right-0 w-32 h-32 opacity-5 dark:opacity-10">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
//               >
//                 <Icon className="w-full h-full text-purple-500" />
//               </motion.div>
//             </div>

//             <div className="flex items-center mb-6 relative z-10">
//               <motion.div
//                 initial={{ scale: 0, rotate: -90 }}
//                 animate={{ scale: 1, rotate: 0 }}
//                 transition={{ duration: 0.6, type: "spring" }}
//                 className="relative mr-6"
//               >
//                 <div className={`p-4 bg-gradient-to-br ${quiz.gradient} rounded-2xl shadow-lg`}>
//                   <motion.div
//                     animate={{ y: [-2, 2, -2] }}
//                     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//                   >
//                     <Icon className="w-8 h-8 text-white" />
//                   </motion.div>
//                 </div>
//                 <motion.div
//                   className={`absolute inset-0 bg-gradient-to-br ${quiz.gradient} rounded-2xl blur-md opacity-0 group-hover:opacity-50`}
//                   whileHover={{ scale: 1.2 }}
//                   transition={{ duration: 0.3 }}
//                 />
//               </motion.div>

//               <div>
//                 <span className={`inline-block px-4 py-2 bg-gradient-to-r ${quiz.gradient} text-white text-sm font-semibold rounded-full shadow-lg mb-3`}>
//                   {quiz.category}
//                 </span>
//                 <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
//                   {quiz.title}
//                 </h1>
//               </div>
//             </div>

//             {!showResult && (
//               <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: `${progress}%` }}
//                   transition={{ duration: 0.5, ease: "easeOut" }}
//                   className={`h-full bg-gradient-to-r ${quiz.gradient} rounded-full shadow-sm`}
//                 />
//               </div>
//             )}
//           </div>
//         </motion.div>

//         {/* Quiz Content */}
//         <AnimatePresence mode="wait">
//           {!showResult ? (
//             <motion.div
//               key={currentQuestion}
//               variants={questionVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden"
//             >
//               {/* Background decoration */}
//               <div className="absolute top-0 left-0 w-64 h-64 opacity-5 dark:opacity-10">
//                 <motion.div
//                   animate={{ rotate: -360 }}
//                   transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
//                   className={`w-full h-full bg-gradient-to-br ${quiz.gradient} rounded-full`}
//                 />
//               </div>

//               <div className="relative z-10">
//                 <div className="mb-8">
//                   <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
//                     Question {currentQuestion + 1} of {totalQuestions}
//                   </span>
//                   <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mt-3 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
//                     {quiz.questions[currentQuestion].question}
//                   </h2>
//                 </div>

//                 <div className="space-y-4">
//                   {quiz.questions[currentQuestion].options.map((option, index) => (
//                     <motion.button
//                       key={index}
//                       variants={optionVariants}
//                       initial="hidden"
//                       animate="visible"
//                       custom={index}
//                       whileHover={{
//                         scale: 1.02,
//                         boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
//                         y: -2
//                       }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => handleAnswer(option.value)}
//                       className="w-full p-6 text-left bg-gray-50/80 dark:bg-gray-800/80 hover:bg-purple-50 dark:hover:bg-purple-900/30 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 rounded-2xl transition-all duration-300 backdrop-blur-sm group"
//                     >
//                       <span className="text-lg text-gray-700 dark:text-gray-300 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">
//                         {option.text}
//                       </span>
//                     </motion.button>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8, y: 50 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
//               className="relative"
//             >
//               <div className={`bg-gradient-to-br ${quiz.gradient} dark:from-purple-800 dark:via-indigo-800 dark:to-blue-800 rounded-3xl p-12 text-center shadow-2xl overflow-hidden`}>
//                 <div className="absolute inset-0 bg-black/20 dark:bg-black/40 rounded-3xl" />

//                 {/* Celebration particles */}
//                 <div className="absolute inset-0 overflow-hidden rounded-3xl">
//                   {[...Array(30)].map((_, i) => (
//                     <motion.div
//                       key={i}
//                       className="absolute bg-white/30 rounded-full"
//                       style={{
//                         left: `${Math.random() * 100}%`,
//                         top: `${Math.random() * 100}%`,
//                         width: `${Math.random() * 10 + 5}px`,
//                         height: `${Math.random() * 10 + 5}px`,
//                       }}
//                       animate={{
//                         y: [0, -30, 0],
//                         opacity: [0, 1, 0],
//                         scale: [0, 1, 0],
//                       }}
//                       transition={{
//                         duration: Math.random() * 3 + 2,
//                         repeat: Infinity,
//                         delay: Math.random() * 2,
//                       }}
//                     />
//                   ))}
//                 </div>

//                 <div className="relative z-10">
//                   <motion.div
//                     initial={{ scale: 0, rotate: 0 }}
//                     animate={{ scale: 1, rotate: 360 }}
//                     transition={{ duration: 1, type: "spring", stiffness: 150 }}
//                     className="mb-8"
//                   >
//                     <div className="relative inline-block">
//                       <Icon className="w-20 h-20 mx-auto text-white drop-shadow-2xl" />
//                       <motion.div
//                         className="absolute -inset-6 bg-white/20 rounded-full blur-xl"
//                         animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
//                         transition={{ duration: 3, repeat: Infinity }}
//                       />
//                     </div>
//                   </motion.div>

//                   <motion.h2
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3, duration: 0.8 }}
//                     className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl"
//                     style={{ fontFamily: 'Playfair Display, serif' }}
//                   >
//                     {getResult().title}
//                   </motion.h2>

//                   <motion.p
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.5, duration: 0.8 }}
//                     className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
//                   >
//                     {getResult().description}
//                   </motion.p>

//                   <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.7, duration: 0.8 }}
//                     className="flex flex-col sm:flex-row gap-6 justify-center"
//                   >
//                     <motion.button
//                       whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={resetQuiz}
//                       className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full hover:bg-white/30 transition-all duration-300 shadow-xl"
//                     >
//                       Take Again
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => router.push('/')}
//                       className="px-8 py-4 bg-white text-purple-600 hover:bg-gray-100 font-semibold rounded-full transition-all duration-300 shadow-xl"
//                     >
//                       More Quizzes
//                     </motion.button>
//                   </motion.div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };
