'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PlaceholderSVG from './placeholder-svg'

interface Task {
	id: number
	title: string
}

interface FloatingWidgetProps {
	tasks: Task[]
}

const FloatingWidget: React.FC<FloatingWidgetProps> = ({ tasks }) => {
	const [isVisible, setIsVisible] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)
	const [isIdle, setIsIdle] = useState(false)

	useEffect(() => {
		// Initial appearance animation
		const showTimer = setTimeout(() => setIsVisible(true), 1000)

		// Start idle animation after initial appearance
		const idleTimer = setTimeout(() => setIsIdle(true), 2000)

		return () => {
			clearTimeout(showTimer)
			clearTimeout(idleTimer)
		}
	}, [])

	const widgetVariants = {
		hidden: {
			opacity: 0,
			y: 100,
			scale: 0.3,
			rotate: -45,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			rotate: 0,
			transition: {
				type: 'spring',
				stiffness: 300,
				damping: 20,
				mass: 1,
				duration: 1,
			},
		},
		idle: {
			y: [0, -8, 0],
			transition: {
				duration: 3,
				repeat: Infinity,
				ease: 'easeInOut',
			},
		},
		expanded: {
			width: '300px',
			height: '400px',
			transition: {
				type: 'spring',
				stiffness: 200,
				damping: 25,
			},
		},
	}

	return (
		<AnimatePresence>
			{isVisible && tasks.length > 0 && (
				<motion.div
					className='fixed bottom-4 right-4 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow'
					initial='hidden'
					animate={[
						isExpanded ? 'expanded' : 'visible',
						isIdle && !isExpanded ? 'idle' : '',
					]}
					exit='hidden'
					variants={widgetVariants}
				>
					<motion.div
						className='p-4 cursor-pointer relative'
						onClick={() => setIsExpanded(!isExpanded)}
						whileHover='hover'
						whileTap={{ scale: 0.95 }}
					>
						<PlaceholderSVG />
						{!isExpanded && (
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'
							>
								{tasks.length}
							</motion.div>
						)}
					</motion.div>

					{isExpanded && (
						<motion.div
							className='p-4'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
						>
							<ul className='space-y-2'>
								{tasks.map((task) => (
									<motion.li
										key={task.id}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 0.2 }}
										className='bg-gray-100 p-2 rounded'
									>
										{task.title}
									</motion.li>
								))}
							</ul>
						</motion.div>
					)}
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default FloatingWidget
