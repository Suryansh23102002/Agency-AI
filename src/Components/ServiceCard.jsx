import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from "motion/react"

gsap.registerPlugin(ScrollTrigger)

const ServiceCard = ({ service, index, theme }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  // GSAP animation untouched
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.15,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [index])

  return (
    <motion.div
      initial={{opacity:0, y: 30}}
      whileInView={{ opacity: 1, y: 0}}
      transition={{duration: 0.5, delay: index * 0.2}}
      viewport={{once: true}}
      ref={cardRef}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      }}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      className="relative overflow-hidden max-w-lg m-2 sm:m-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl shadow-gray-100 dark:shadow-white/10"
      style={{
        backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF', // Card background
      }}
    >
      {/*  Gradient background — now shows in both light & dark */}
      <div
        className="pointer-events-none blur-2xl rounded-full bg-gradient-to-r 
                   from-blue-500 via-indigo-500 to-purple-500 
                   w-[300px] h-[300px] absolute z-0 transition-opacity duration-500"
        style={{
          top: position.y - 150,
          left: position.x - 150,
          mixBlendMode: theme === 'dark' ? 'lighten' : 'multiply', 
          opacity: theme === 'dark' ? 0.7 : 0.8, 
        }}
      />

      {/* Card content */}
      <div
        className="flex items-center gap-10 p-8 hover:p-7 hover:m-1 transition-all rounded-[10px] bg-white dark:bg-gray-900 z-10 relative"
        style={{
          backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
        }}
      >
        {/* Icon wrapper */}
        <div
          className="bg-gray-100 dark:bg-gray-700 rounded-full"
          style={{
            backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6',
          }}
        >
          <img
            src={service.icon}
            alt={service.title}
            className="max-w-24 bg-white dark:bg-gray-900 rounded-full m-2"
          />
        </div>

        {/* Text */}
        <div className="flex-1">
          <h3
            className="font-bold text-gray-900 dark:text-white"
            style={{ color: theme === 'dark' ? '#FFFFFF' : '#111827' }}
          >
            {service.title}
          </h3>
          <p
            className="text-sm mt-2 text-gray-800 dark:text-gray-300"
            style={{ color: theme === 'dark' ? '#D1D5DB' : '#374151' }}
          >
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default ServiceCard
