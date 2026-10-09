import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

/**
 * Animação de entrada reutilizável (fade + slide).
 * Dispara quando o elemento entra na viewport — via react-intersection-observer
 * — e anima com Framer Motion.
 *
 * @param {'up'|'down'|'left'|'right'|'none'} from  direção de origem
 */
export default function Reveal({
  children,
  from = 'up',
  delay = 0,
  duration = 0.9,
  distance = 28,
  className = '',
  as = 'div',
  once = true,
  amount = 0.25,
  ...rest
}) {
  const reduceMotion = useReducedMotion()
  const [setRef, inView] = useInView({ triggerOnce: once, threshold: amount })

  // Direções de entrada
  const offset = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  }[from]

  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      ref={setRef}
      className={className}
      initial={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0 }
          : reduceMotion
            ? { opacity: 0 }
            : { opacity: 0, x: offset.x, y: offset.y }
      }
      transition={{
        duration: reduceMotion ? 0.2 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
