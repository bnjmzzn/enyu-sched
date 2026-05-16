import { create } from "zustand"
import type { ParsedCourse, Schedule } from "./parser"
import { DEFAULT_MAX_UNITS, DEFAULT_SECTION_NAME } from "./config"

export type Course = {
    id: string
    code: string
    unit: number
    schedules: Schedule[]
    enabled: boolean
}

export type Section = {
    id: string
    name: string
    courses: Course[]
}

type Store = {
    maxUnits: number
    sections: Section[]
    setMaxUnits: (value: number) => void
    addSection: () => void
    renameSection: (sectionId: string, name: string) => void
    removeSection: (sectionId: string) => void
    addCourses: (sectionId: string, parsed: ParsedCourse[]) => void
    removeCourse: (sectionId: string, courseId: string) => void
    toggleCourse: (sectionId: string, courseId: string) => void
    toggleAllCourses: (sectionId: string, enabled: boolean) => void
    tableTitle: string
    setTableTitle: (title: string) => void
}

function generateId(): string {
    return crypto.randomUUID()
}

function parsedToCourse(parsed: ParsedCourse): Course {
    return {
        id: generateId(),
        code: parsed.code,
        unit: parsed.unit,
        schedules: parsed.schedules,
        enabled: true,
    }
}

export const useStore = create<Store>((set) => ({
    tableTitle: "My Table",
    setTableTitle: (title) => set({ tableTitle: title }),

    maxUnits: DEFAULT_MAX_UNITS,
    sections: [
        {
            id: generateId(),
            name: DEFAULT_SECTION_NAME,
            courses: [],
        },
    ],

    setMaxUnits: (value) => set({ maxUnits: value }),

    addSection: () =>
        set((state) => {
            const count = state.sections.length + 1
            return {
                sections: [
                    ...state.sections,
                    {
                        id: generateId(),
                        name: `Section ${count}`,
                        courses: [],
                    },
                ],
            }
        }),

    renameSection: (sectionId, name) =>
        set((state) => ({
            sections: state.sections.map((s) =>
                s.id === sectionId ? { ...s, name } : s
            ),
        })),

    removeSection: (sectionId) =>
        set((state) => ({
            sections: state.sections.filter((s) => s.id !== sectionId),
        })),

    addCourses: (sectionId, parsed) =>
        set((state) => ({
            sections: state.sections.map((s) =>
                s.id === sectionId
                    ? { ...s, courses: [...s.courses, ...parsed.map(parsedToCourse)] }
                    : s
            ),
        })),

    removeCourse: (sectionId, courseId) =>
        set((state) => ({
            sections: state.sections.map((s) =>
                s.id === sectionId
                    ? { ...s, courses: s.courses.filter((sub) => sub.id !== courseId) }
                    : s
            ),
        })),

    toggleCourse: (sectionId, courseId) =>
        set((state) => ({
            sections: state.sections.map((s) =>
                s.id === sectionId
                    ? {
                          ...s,
                          courses: s.courses.map((sub) =>
                              sub.id === courseId ? { ...sub, enabled: !sub.enabled } : sub
                          ),
                      }
                    : s
            ),
        })),

    toggleAllCourses: (sectionId, enabled) =>
        set((state) => ({
            sections: state.sections.map((s) =>
                s.id === sectionId
                    ? { ...s, courses: s.courses.map((sub) => ({ ...sub, enabled })) }
                    : s
            ),
        })),
}))