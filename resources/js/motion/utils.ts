// resources/js/motion/utils.ts
type Dir = 'up'|'down'|'left'|'right'|'none'
export function dirToInitial(dir: Dir, distance = 24) {
  switch (dir) {
    case 'up':    return { y:  distance }
    case 'down':  return { y: -distance }
    case 'left':  return { x:  distance }
    case 'right': return { x: -distance }
    default:      return {}
  }
}
