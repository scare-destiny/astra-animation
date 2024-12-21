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

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 1000)
		return () => clearTimeout(timer)
	}, [])

	const widgetVariants = {
		hidden: { opacity: 0, y: 20, scale: 0.8 },
		visible: { opacity: 1, y: 0, scale: 1 },
		expanded: { width: '300px', height: '400px' },
	}

	return (
		<AnimatePresence>
			{isVisible && tasks.length > 0 && (
				<motion.div
					className='fixed bottom-4 right-4 bg-white rounded-lg shadow-lg overflow-hidden'
					initial='hidden'
					animate={isExpanded ? 'expanded' : 'visible'}
					exit='hidden'
					variants={widgetVariants}
					transition={{ type: 'spring', stiffness: 300, damping: 25 }}
				>
					<motion.div
						className='p-4 cursor-pointer'
						onClick={() => setIsExpanded(!isExpanded)}
						whileHover='hover'
					>
						<PlaceholderSVG />
						{!isExpanded && (
							<motion.div
								className='mt-2 text-center font-semibold'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.2 }}
							>
								{tasks.length} tasks in queue
							</motion.div>
						)}
					</motion.div>
					{isExpanded && (
						<motion.div
							className='p-4'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.1 }}
						>
							<h3 className='text-lg font-semibold mb-2'>Tasks in Queue</h3>
							<ul className='space-y-2'>
								{tasks.map((task) => (
									<li key={task.id} className='bg-gray-100 p-2 rounded'>
										{task.title}
									</li>
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
