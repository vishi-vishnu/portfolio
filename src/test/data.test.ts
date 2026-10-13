import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { projects, projectCategories } from '../data/projects'
import { skills, skillCategories } from '../data/skills'
import { timeline } from '../data/timeline'
import { TECH } from '../data/techIcons'
import { profile } from '../data/profile'

// These checks run in CI, so a typo in a data file fails the build instead of breaking the live site.
const PUBLIC = join(__dirname, '..', '..', 'public')

describe('projects data', () => {
  it('has unique ids', () => {
    const ids = projects.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it.each(projects.map((p) => [p.id, p]))('%s has a cover image in public/', (_id, p) => {
    expect(existsSync(join(PUBLIC, p.image)), `missing image ${p.image}`).toBe(true)
  })

  it.each(projects.map((p) => [p.id, p]))('%s uses known categories and https links', (_id, p) => {
    const known = projectCategories.map((c) => c.id as string)
    p.categories.forEach((c) => expect(known).toContain(c))
    Object.values(p.links ?? {}).forEach((url) => expect(url).toMatch(/^https:\/\//))
    expect(p.stack.length).toBeGreaterThan(0)
  })

  it('every stack item has a logo', () => {
    const missing = [...new Set(projects.flatMap((p) => p.stack))].filter((s) => !TECH[s])
    expect(missing, `add these to techIcons.ts: ${missing.join(', ')}`).toEqual([])
  })
})

describe('skills data', () => {
  it('has unique names, valid levels and categories', () => {
    const names = skills.map((s) => s.name)
    expect(new Set(names).size).toBe(names.length)
    const cats = skillCategories.map((c) => c.id as string)
    skills.forEach((s) => {
      expect(s.level).toBeGreaterThanOrEqual(0)
      expect(s.level).toBeLessThanOrEqual(100)
      expect(cats).toContain(s.category)
    })
  })

  it('every skill has a logo', () => {
    const missing = skills.map((s) => s.name).filter((n) => !TECH[n])
    expect(missing, `add these to techIcons.ts: ${missing.join(', ')}`).toEqual([])
  })
})

describe('profile and timeline', () => {
  it('resume PDF exists', () => {
    expect(existsSync(join(PUBLIC, profile.resume))).toBe(true)
  })
  it('has at most one current role', () => {
    expect(timeline.filter((t) => t.current).length).toBeLessThanOrEqual(1)
  })
})
