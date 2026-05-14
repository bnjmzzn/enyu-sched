import { create } from "zustand"
import type { ParsedSubject, Schedule } from "./parser"
import { DEFAULT_MAX_UNITS, DEFAULT_SECTION_NAME } from "./config"

export type Subject = {
    id: string
    code: string
    unit: number
    schedules: Schedule[]
    enabled: boolean
}

export type Section = {
    id: string
    name: string
    subjects: Subject[]
}

type Store = {
    maxUnits: number
    sections: Section[]
    setMaxUnits: (value: number) => void
    addSection: () => void
    renameSection: (sectionId: string, name: string) => void
    removeSection: (sectionId: string) => void
    addSubjects: (sectionId: string, parsed: ParsedSubject[]) => void
    removeSubject: (sectionId: string, subjectId: string) => void
    toggleSubject: (sectionId: string, subjectId: string) => void
    toggleAllSubjects: (sectionId: string, enabled: boolean) => void
}

function generateId(): string {
    return crypto.randomUUID()
}

function parsedToSubject(parsed: ParsedSubject): Subject {
    return {
        id: generateId(),
        code: parsed.code,
        unit: parsed.unit,
        schedules: parsed.schedules,
        enabled: true,
    }
}

export const useStore = create<Store>((set) => ({
    maxUnits: DEFAULT_MAX_UNITS,
    sections: [
        {
            id: generateId(),
            name: DEFAULT_SECTION_NAME,
            subjects: [],
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
                        subjects: [],
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

    addSubjects: (sectionId, parsed) =>
        set((state) => ({
            sections: state.sections.map((s) =>
                s.id === sectionId
                    ? { ...s, subjects: [...s.subjects, ...parsed.map(parsedToSubject)] }
                    : s
            ),
        })),

    removeSubject: (sectionId, subjectId) =>
        set((state) => ({
            sections: state.sections.map((s) =>
                s.id === sectionId
                    ? { ...s, subjects: s.subjects.filter((sub) => sub.id !== subjectId) }
                    : s
            ),
        })),

    toggleSubject: (sectionId, subjectId) =>
        set((state) => ({
            sections: state.sections.map((s) =>
                s.id === sectionId
                    ? {
                          ...s,
                          subjects: s.subjects.map((sub) =>
                              sub.id === subjectId ? { ...sub, enabled: !sub.enabled } : sub
                          ),
                      }
                    : s
            ),
        })),

    toggleAllSubjects: (sectionId, enabled) =>
        set((state) => ({
            sections: state.sections.map((s) =>
                s.id === sectionId
                    ? { ...s, subjects: s.subjects.map((sub) => ({ ...sub, enabled })) }
                    : s
            ),
        })),
}))