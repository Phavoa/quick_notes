import { motion } from 'framer-motion'
import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Edit, Trash } from 'lucide-react'

const NoteCard = ({note, onEdit, onDelete}) => {

  return (
     <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="relative h-52 hover:shadow-md transition-shadow bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <CardHeader>
              <CardTitle className="text-xl font-bold">{note.title}</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">{note.content}</CardDescription>
            </CardHeader>
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button variant="ghost" size="icon" onClick={() => onEdit(note)} aria-label="Edit note">
                <Edit className="h-4 w-4 text-blue-500" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onDelete(note.id)} aria-label="Delete note">
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </Card>
        </motion.div>
  )
}

export default NoteCard