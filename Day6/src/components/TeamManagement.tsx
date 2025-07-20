import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addTeamMember, updateTeamMember, deleteTeamMember, updateWorkAssignment } from '../store/slices/teamSlice'
import type { TeamMember } from '../store/slices/teamSlice'
import './TeamManagement.css'

const TeamManagement: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    internType: '',
    workAssigned: ''
  })
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [workAssignmentEdit, setWorkAssignmentEdit] = useState<{id: string, work: string} | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  
  const { members } = useAppSelector((state: any) => state.team)
  const dispatch = useAppDispatch()

  // Filter members based on search term
  const filteredMembers = members.filter((member: TeamMember) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.internType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.workAssigned.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const internTypes = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'UI/UX Designer',
    'Data Analyst',
    'DevOps Engineer',
    'Mobile Developer',
    'QA Tester'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name.trim() && formData.internType && formData.workAssigned.trim()) {
      if (editingMember) {
        dispatch(updateTeamMember({
          ...editingMember,
          ...formData
        }))
        setEditingMember(null)
      } else {
        dispatch(addTeamMember(formData))
      }
      setFormData({ name: '', internType: '', workAssigned: '' })
    }
  }

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      internType: member.internType,
      workAssigned: member.workAssigned
    })
  }

  const handleCancelEdit = () => {
    setEditingMember(null)
    setFormData({ name: '', internType: '', workAssigned: '' })
  }

  const handleDelete = (id: string) => {
    dispatch(deleteTeamMember(id))
  }

  const handleWorkAssignmentUpdate = (id: string, newWork: string) => {
    dispatch(updateWorkAssignment({ id, workAssigned: newWork }))
    setWorkAssignmentEdit(null)
  }

  const startWorkEdit = (id: string, currentWork: string) => {
    setWorkAssignmentEdit({ id, work: currentWork })
  }

  return (
    <div className="team-container">
      <h2>👥 Team Management</h2>
      
      <form onSubmit={handleSubmit} className="team-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter intern name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="internType">Intern Type:</label>
            <select
              id="internType"
              name="internType"
              value={formData.internType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select intern type</option>
              {internTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-group full-width">
          <label htmlFor="workAssigned">Work Assigned:</label>
          <input
            type="text"
            id="workAssigned"
            name="workAssigned"
            value={formData.workAssigned}
            onChange={handleInputChange}
            placeholder="Describe the assigned work"
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {editingMember ? 'Update Member' : 'Add Team Member'}
          </button>
          {editingMember && (
            <button type="button" onClick={handleCancelEdit} className="cancel-btn">
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="search-section">
        <div className="search-group">
          <label htmlFor="search">🔍 Search Team Members:</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, intern type, or work assignment..."
            className="search-input"
          />
        </div>
      </div>

      <div className="team-list">
        {filteredMembers.length === 0 ? (
          <p className="empty-message">
            {members.length === 0 
              ? "No team members yet. Add one above!" 
              : "No team members found matching your search."
            }
          </p>
        ) : (
          <div className="members-grid">
            {filteredMembers.map((member: TeamMember) => (
              <div key={member.id} className="member-card">
                <div className="member-header">
                  <h3>{member.name}</h3>
                  <span className="intern-badge">{member.internType}</span>
                </div>
                
                <div className="work-section">
                  <label>Work Assigned:</label>
                  {workAssignmentEdit?.id === member.id ? (
                    <div className="work-edit">
                      <input
                        type="text"
                        value={workAssignmentEdit.work}
                        onChange={(e) => workAssignmentEdit && setWorkAssignmentEdit({
                          id: workAssignmentEdit.id,
                          work: e.target.value
                        })}
                        className="work-input"
                        aria-label="Edit work assignment"
                      />
                      <button 
                        onClick={() => workAssignmentEdit && handleWorkAssignmentUpdate(member.id, workAssignmentEdit.work)}
                        className="save-work-btn"
                      >
                        Save
                      </button>
                      <button 
                        onClick={() => setWorkAssignmentEdit(null)}
                        className="cancel-work-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="work-display">
                      <p>{member.workAssigned}</p>
                      <button 
                        onClick={() => startWorkEdit(member.id, member.workAssigned)}
                        className="edit-work-btn"
                      >
                        Edit Work
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="member-actions">
                  <button 
                    onClick={() => handleEdit(member)}
                    className="edit-btn"
                  >
                    Edit Member
                  </button>
                  <button 
                    onClick={() => handleDelete(member.id)}
                    className="delete-btn"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="member-date">
                  Added: {new Date(member.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="team-stats">
        <div className="stat-item">
          <span className="stat-label">Total Members:</span>
          <span className="stat-value">{members.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Intern Types:</span>
          <span className="stat-value">{new Set(members.map((m: TeamMember) => m.internType)).size}</span>
        </div>
      </div>
    </div>
  )
}

export default TeamManagement
