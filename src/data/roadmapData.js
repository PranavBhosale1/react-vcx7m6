// src/data/roadmapData.js
export const roadmapData = {
  id: 'roadmap1',
  title: 'My Semester Roadmap',
  subjects: [
    {
      id: 'subject1',
      name: 'Mathematics',
      topics: [
        {
          id: 'topic1',
          name: 'Algebra',
          completed: false,
          tasks: [
            { id: 'task1', description: 'Review equations', completed: false },
            {
              id: 'task2',
              description: 'Practice solving for variables',
              completed: false,
            },
          ],
          resources: [
            'https://www.khanacademy.org/math/algebra',
            'https://www.mathsisfun.com/algebra/index.html',
          ],
          notes: 'Focus on understanding basic concepts.',
          attachments: [], // New property for study materials
        },
        {
          id: 'topic2',
          name: 'Calculus',
          completed: false,
          tasks: [
            {
              id: 'task3',
              description: 'Learn about derivatives',
              completed: false,
            },
            {
              id: 'task4',
              description: 'Understand integrals',
              completed: false,
            },
          ],
          resources: ['https://www.khanacademy.org/math/calculus-1'],
          notes: 'Calculus can be challenging, so practice regularly.',
          attachments: [], // New property for study materials
        },
        // Add more topics for Mathematics here
      ],
    },
    {
      id: 'subject2',
      name: 'History',
      topics: [
        {
          id: 'topic3',
          name: 'Ancient Civilizations',
          completed: false,
          tasks: [
            { id: 'task5', description: 'Study Mesopotamia', completed: false },
            {
              id: 'task6',
              description: 'Learn about Ancient Egypt',
              completed: false,
            },
          ],
          resources: [
            'https://www.history.com/topics/ancient-history',
            'https://www.nationalgeographic.com/history/',
          ],
          notes: 'History is more than just memorizing dates!',
          attachments: [], // New property for study materials
        },
        // Add more topics for History here
      ],
    },
    // Add more subjects here
  ],
};
