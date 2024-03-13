import { create } from 'zustand'

interface HoverSwipeState {
  modal: {
    active: boolean
    index: number
  }
  projects: ArchiveProjects
  show: boolean
  allowMouseEvents: boolean
  // eslint-disable-next-line no-unused-vars
  setModal: (modal: { active: boolean; index: number }) => void
  // eslint-disable-next-line no-unused-vars
  setProjects: (projects: ArchiveProjects) => void
  // eslint-disable-next-line no-unused-vars
  setAllowMouseEvents: (allowMouseEvents: boolean) => void
  // eslint-disable-next-line no-unused-vars
  setShow: (show: boolean) => void
}

export type InitialHoverSwipeState = Pick<
  HoverSwipeState,
  'modal' | 'projects' | 'allowMouseEvents' | 'show'
>

export const initialState: InitialHoverSwipeState = {
  modal: {
    active: false,
    index: 0,
  },
  projects: [],
  allowMouseEvents: true,
  show: true,
}

const useHoverSwipe = create<HoverSwipeState>()((set) => ({
  ...initialState,
  setModal: (modal) => set(() => ({ modal })),
  setProjects: (projects) => set(() => ({ projects })),
  setAllowMouseEvents: (allowMouseEvents) => set(() => ({ allowMouseEvents })),
  setShow: (show) => set(() => ({ show })),
}))

export default useHoverSwipe
