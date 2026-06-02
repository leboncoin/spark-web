import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ReactNode, useRef } from 'react'

export const AnimatedHero = () => {
  const containerRef = useRef<HTMLParagraphElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      const words = containerRef.current.querySelectorAll('.gsap-word')
      const highlight = containerRef.current.querySelector('.gsap-highlight')
      const mm = gsap.matchMedia()

      // Only animate if user has not opted out of animation at the OS level
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Set initial states
        gsap.set(words, {
          opacity: 0,
          y: 50,
          rotateX: -90,
        })

        gsap.set(highlight, {
          '--gradient-position': '0%',
        })

        // Create shared timeline
        const timeline = gsap.timeline({
          defaults: {
            ease: 'power4.out',
          },
        })

        // Animate words appearing one by one
        timeline.to(words, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
        })
      })

      // If reduced motion is preferred, ensure elements are visible
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(words, {
          opacity: 1,
          y: 0,
          rotateX: 0,
        })
      })

      return () => mm.revert()
    },
    { scope: containerRef }
  )

  return (
    <p
      ref={containerRef}
      className="text-display-1 text-on-background"
      style={{ perspective: '1000px' }}
    >
      <span className="gsap-word inline-block">Create</span>{' '}
      <span className="gsap-word accessible-word gsap-highlight text-main relative inline-block">
        <span
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
          style={{
            backgroundSize: '200% 100%',
            backgroundPosition: 'var(--gradient-position, 0%) 0',
          }}
        />
        <span className="relative">accessible</span>
      </span>{' '}
      <span className="gsap-word inline-block">React</span>{' '}
      <span className="gsap-word inline-block">apps</span>
      <br />
      <span className="gsap-word text-support inline-block">with</span>{' '}
      <span className="gsap-word text-support inline-block">ease</span>
      <span className="gsap-word text-support inline-block">.</span>
    </p>
  )
}

interface AnimatedButtonsProps {
  children: ReactNode
}

export const AnimatedButtons = ({ children }: AnimatedButtonsProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      const buttons = containerRef.current.querySelectorAll('.animated-button')
      const mm = gsap.matchMedia()

      // Only animate if user has not opted out of animation at the OS level
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Set initial states
        gsap.set(buttons, {
          opacity: 0,
          scale: 0.5,
        })

        // Create shared timeline
        const timeline = gsap.timeline({
          defaults: {
            ease: 'power4.out',
          },
        })

        // Add button animation to the shared timeline
        timeline.to(buttons, {
          delay: 1,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
        })
      })

      // If reduced motion is preferred, ensure buttons are visible
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(buttons, {
          opacity: 1,
          scale: 1,
        })
      })

      return () => mm.revert()
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className="gap-md pt-md flex flex-wrap justify-center">
      {children}
    </div>
  )
}
