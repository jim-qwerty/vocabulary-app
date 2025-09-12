export type Module = { id: string; name: string };
export type Lesson  = { id: string; moduleId: string; title: string };
export type Exercise = { id: string; lessonId: string; type: "vocab"|"grammar"; payload: unknown };
