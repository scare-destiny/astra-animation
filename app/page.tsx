'use client'

import React, { useState, useEffect } from 'react'
import FloatingWidget from '../components/floating-widget'

const tasks = [
	{ id: 1, title: 'Complete project proposal' },
	{ id: 2, title: 'Review code changes' },
	{ id: 3, title: 'Update documentation' },
]

export default function Home() {
	const [showTasks, setShowTasks] = useState(false)

	useEffect(() => {
		// Simulate loading tasks after a delay
		const timer = setTimeout(() => setShowTasks(true), 2000)
		return () => clearTimeout(timer)
	}, [])

	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-24'>
			<h1 className='text-4xl font-bold mb-8'>Floating Widget Demo</h1>
			<p className='text-xl mb-4'>
				{showTasks
					? 'Tasks loaded! Check the bottom-right corner.'
					: 'Loading tasks...'}
			</p>
			{showTasks && <FloatingWidget tasks={tasks} />}
		</main>
	)
}
