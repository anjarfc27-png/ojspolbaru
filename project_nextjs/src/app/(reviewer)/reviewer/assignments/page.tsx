'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Calendar, Eye, Download, Clock, CheckCircle, XCircle } from 'lucide-react';

import { withAuth } from '@/lib/auth-client'

function ReviewerAssignments() {
  const { user } = useAuth();
  const [assignments] = useState([
    {
      id: 1,
      title: 'The Impact of Social Media on Academic Performance: A Meta-Analysis',
      authors: 'Smith, J., Johnson, M., Brown, A.',
      journal: 'Journal of Educational Technology',
      submission_date: '2024-01-15',
      due_date: '2024-02-15',
      status: 'Pending',
      stage: 'External Review',
      days_remaining: 12,
      abstract: 'This study examines the relationship between social media usage and academic performance through a comprehensive meta-analysis of existing literature...'
    },
    {
      id: 2,
      title: 'Machine Learning Approaches in Educational Technology',
      authors: 'Davis, R., Wilson, K.',
      journal: 'International Journal of Learning Technologies',
      submission_date: '2024-01-10',
      due_date: '2024-02-10',
      status: 'In Progress',
      stage: 'External Review',
      days_remaining: 7,
      abstract: 'This paper explores various machine learning techniques applied to educational technology contexts...'
    },
    {
      id: 3,
      title: 'Digital Literacy in Higher Education: Challenges and Opportunities',
      authors: 'Lee, S., Garcia, M.',
      journal: 'Educational Research Review',
      submission_date: '2024-01-05',
      due_date: '2024-02-05',
      status: 'Overdue',
      stage: 'External Review',
      days_remaining: -3,
      abstract: 'An analysis of digital literacy challenges faced by higher education institutions...'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysColor = (days: number) => {
    if (days < 0) return 'text-red-600';
    if (days <= 7) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Review Assignments</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{assignments.filter(a => a.status === 'Pending').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{assignments.filter(a => a.status === 'In Progress').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{assignments.filter(a => a.status === 'Overdue').length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Review Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{assignment.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">Authors: {assignment.authors}</p>
                    <p className="text-sm text-gray-600">Journal: {assignment.journal}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status}
                    </Badge>
                    <Badge variant="outline">{assignment.stage}</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-gray-500">Submission Date:</span>
                    <p className="font-medium">{assignment.submission_date}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Due Date:</span>
                    <p className="font-medium">{assignment.due_date}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Days Remaining:</span>
                    <p className={`font-medium ${getDaysColor(assignment.days_remaining)}`}>
                      {assignment.days_remaining > 0 ? `${assignment.days_remaining} days` : `${Math.abs(assignment.days_remaining)} days overdue`}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Assignment ID:</span>
                    <p className="font-medium">#{assignment.id}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-gray-500 text-sm">Abstract:</span>
                  <p className="text-sm text-gray-700 mt-1">{assignment.abstract}</p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Manuscript
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download Files
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    {assignment.status !== 'Completed' && (
                      <Button variant="primary" size="sm">
                        Start Review
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      Decline
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(ReviewerAssignments, 'reviewer')
