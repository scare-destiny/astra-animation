'use client'

import React, { useState, useEffect } from 'react'
import FloatingWidget from '../components/floating-widget'
import { motion } from 'framer-motion'

const tasks = [
	{ id: 1, title: 'Complete project proposal' },
	{ id: 2, title: 'Review code changes' },
	{ id: 3, title: 'Update documentation' },
]

export default function Home() {
	const [showTasks, setShowTasks] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => setShowTasks(true), 1500)
		return () => clearTimeout(timer)
	}, [])

	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-24'>
			<motion.h1
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: 'easeOut' }}
				className='text-4xl font-bold mb-8'
			>
				AI Design Assistant
			</motion.h1>
			{showTasks && <FloatingWidget tasks={tasks} />}
		</main>
	)
}
