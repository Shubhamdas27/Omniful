import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface TeamMember {
  id: string
  name: string
  internType: string
  workAssigned: string
  createdAt: string
}

interface TeamState {
  members: TeamMember[]
}

const initialState: TeamState = {
  members: []
}

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    addTeamMember: (state, action: PayloadAction<Omit<TeamMember, 'id' | 'createdAt'>>) => {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        ...action.payload,
        createdAt: new Date().toISOString()
      }
      state.members.push(newMember)
    },
    updateTeamMember: (state, action: PayloadAction<TeamMember>) => {
      const index = state.members.findIndex(member => member.id === action.payload.id)
      if (index !== -1) {
        state.members[index] = action.payload
      }
    },
    deleteTeamMember: (state, action: PayloadAction<string>) => {
      state.members = state.members.filter(member => member.id !== action.payload)
    },
    updateWorkAssignment: (state, action: PayloadAction<{ id: string; workAssigned: string }>) => {
      const member = state.members.find(member => member.id === action.payload.id)
      if (member) {
        member.workAssigned = action.payload.workAssigned
      }
    }
  }
})

export const { addTeamMember, updateTeamMember, deleteTeamMember, updateWorkAssignment } = teamSlice.actions
export default teamSlice.reducer
