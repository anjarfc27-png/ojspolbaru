"use client";

import { SubmissionTable } from "@/features/editor/components/submission-table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import type { SubmissionSummary } from "@/features/editor/types";

// Dummy data - sama dengan yang digunakan di getDummySubmissions
const dummySubmissions: SubmissionSummary[] = [
  {
    id: "1",
    title: "Pemanfaatan Machine Learning untuk Prediksi Cuaca di Daerah Tropis",
    journalId: "1",
    journalTitle: "Jurnal Teknologi Informasi",
    stage: "review",
    current_stage: "review",
    status: "in_review",
    isArchived: false,
    submittedAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-20T10:30:00Z",
    assignees: [],
    author_name: "Dr. Andi Wijaya, M.Kom",
  },
  {
    id: "2",
    title: "Analisis Sentimen Terhadap Kebijakan Pemerintah Menggunakan Deep Learning",
    journalId: "1",
    journalTitle: "Jurnal Teknologi Informasi",
    stage: "copyediting",
    current_stage: "copyediting",
    status: "queued",
    isArchived: false,
    submittedAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-18T14:20:00Z",
    assignees: [],
    author_name: "Siti Nurhaliza, S.T., M.T.",
  },
  {
    id: "3",
    title: "Perancangan Sistem Informasi Manajemen Perpustakaan Berbasis Web",
    journalId: "2",
    journalTitle: "Jurnal Sistem Informasi",
    stage: "production",
    current_stage: "production",
    status: "accepted",
    isArchived: false,
    submittedAt: "2024-01-05T07:30:00Z",
    updatedAt: "2024-01-22T16:45:00Z",
    assignees: [],
    author_name: "Bambang Suryadi, S.Kom., M.Kom.",
  },
  {
    id: "4",
    title: "Implementasi Blockchain untuk Keamanan Data Kesehatan",
    journalId: "1",
    journalTitle: "Jurnal Teknologi Informasi",
    stage: "submission",
    current_stage: "submission",
    status: "queued",
    isArchived: false,
    submittedAt: "2024-01-20T11:00:00Z",
    updatedAt: "2024-01-21T09:15:00Z",
    assignees: [],
    author_name: "Dr. Ratih Pratiwi, M.Kom.",
  },
  {
    id: "5",
    title: "Kajian Perbandingan Metode Klasifikasi untuk Diagnosis Penyakit Jantung",
    journalId: "3",
    journalTitle: "Jurnal Kesehatan Digital",
    stage: "review",
    current_stage: "review",
    status: "in_review",
    isArchived: false,
    submittedAt: "2023-12-20T10:00:00Z",
    updatedAt: "2024-01-12T13:30:00Z",
    assignees: [],
    author_name: "Prof. Dr. Ahmad Rahman, M.Biomed.",
  },
  {
    id: "6",
    title: "Pengembangan Aplikasi Mobile untuk Monitoring Kualitas Udara",
    journalId: "1",
    journalTitle: "Jurnal Teknologi Informasi",
    stage: "copyediting",
    current_stage: "copyediting",
    status: "queued",
    isArchived: false,
    submittedAt: "2024-01-12T14:00:00Z",
    updatedAt: "2024-01-19T11:20:00Z",
    assignees: [],
    author_name: "Diana Putri, S.T., M.T.",
  },
  {
    id: "7",
    title: "Optimasi Algoritma Genetika untuk Penjadwalan Kuliah Otomatis",
    journalId: "2",
    journalTitle: "Jurnal Sistem Informasi",
    stage: "submission",
    current_stage: "submission",
    status: "queued" as any, // Using queued but will be filtered as unassigned
    isArchived: false,
    submittedAt: "2024-01-18T09:30:00Z",
    updatedAt: "2024-01-18T09:30:00Z",
    assignees: [],
    author_name: "Ir. Muhammad Faisal, M.Kom.",
  },
  {
    id: "8",
    title: "Analisis Kinerja Sistem Terdistribusi pada Lingkungan Cloud Computing",
    journalId: "1",
    journalTitle: "Jurnal Teknologi Informasi",
    stage: "production",
    current_stage: "production",
    status: "accepted",
    isArchived: false,
    submittedAt: "2023-12-15T08:15:00Z",
    updatedAt: "2024-01-23T15:00:00Z",
    assignees: [],
    author_name: "Dr. Citra Kusuma, M.Sc.",
  },
];

export default function EditorPage() {
  // Filter data berdasarkan queue - sama seperti getDummySubmissions
  const myQueue = dummySubmissions.filter(item => 
    ["1", "2", "5", "6"].includes(item.id) // Simulate assigned submissions
  );
  
  // Unassigned: filter berdasarkan id yang tidak ada di myQueue (sama seperti getDummySubmissions)
  // Di getDummySubmissions, unassigned filter berdasarkan status "unassigned"
  // Tapi karena type tidak support, kita filter berdasarkan id yang tidak assigned
  const assignedIds = ["1", "2", "5", "6"];
  const unassigned = dummySubmissions.filter(item => 
    !assignedIds.includes(item.id) && !item.isArchived && item.stage === "submission"
  );
  
  const active = dummySubmissions.filter(item => !item.isArchived);
  
  const archived = dummySubmissions.filter(item => item.isArchived);

  // Calculate stats - sama seperti getEditorDashboardStats
  const stats = {
    myQueue: myQueue.length,
    unassigned: unassigned.length,
    submission: active.filter(s => s.stage === "submission").length,
    inReview: active.filter(s => s.stage === "review").length,
    copyediting: active.filter(s => s.stage === "copyediting").length,
    production: active.filter(s => s.stage === "production").length,
    allActive: active.length,
    archived: archived.length,
    tasks: 0,
  };

  return (
    <section className="space-y-10" style={{ gap: '2.5rem' }}>
      {/* Breadcrumbs */}
      <nav style={{ marginBottom: '1rem', fontSize: '1rem', color: '#666666' }}>
        <span style={{ color: '#666666' }}>Home</span>
        <span style={{ margin: '0 0.5rem', color: '#999999' }}>/</span>
        <span style={{ color: '#666666' }}>Editorial</span>
        <span style={{ margin: '0 0.5rem', color: '#999999' }}>/</span>
        <span style={{ color: '#333333', fontWeight: '500' }}>Submissions</span>
      </nav>

      {/* Page Header - OJS 3.3 Style */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="app__pageHeading" style={{
          fontSize: '1.75rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          color: '#002C40'
        }}>
          Submissions
        </h1>
        <p style={{
          fontSize: '1rem',
          color: '#666666',
          marginTop: '0.25rem'
        }}>
          Manage journal submissions and editorial workflow
        </p>
      </div>

      {/* Tabs - OJS 3.3 Style */}
      <Tabs defaultValue="myQueue" className="w-full">
        <div style={{
          borderBottom: '2px solid #ddd',
          marginBottom: '1.5rem'
        }}>
          <TabsList className="bg-transparent p-0 h-auto">
            <div style={{
              padding: '0.75rem 1.25rem',
              fontSize: '1rem',
              fontWeight: '500',
              color: '#666666',
              marginBottom: '-2px',
              display: 'inline-block'
            }}>
              <TabsTrigger 
                value="myQueue" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#006798] data-[state=active]:text-[#006798] data-[state=active]:font-semibold data-[state=active]:bg-transparent bg-transparent border-b-2 border-transparent rounded-none p-0 h-auto"
              >
                My Queue
                {stats?.myQueue > 0 && (
                  <span style={{
                    marginLeft: '0.5rem',
                    backgroundColor: '#006798',
                    color: 'white',
                    padding: '0.25rem 0.625rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {stats.myQueue}
                  </span>
                )}
              </TabsTrigger>
            </div>
            <div style={{
              padding: '0.75rem 1.25rem',
              fontSize: '1rem',
              fontWeight: '500',
              color: '#666666',
              marginBottom: '-2px',
              display: 'inline-block'
            }}>
              <TabsTrigger 
                value="unassigned"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#006798] data-[state=active]:text-[#006798] data-[state=active]:font-semibold data-[state=active]:bg-transparent bg-transparent border-b-2 border-transparent rounded-none p-0 h-auto"
              >
                Unassigned
                {stats?.unassigned > 0 && (
                  <span style={{
                    marginLeft: '0.5rem',
                    backgroundColor: '#006798',
                    color: 'white',
                    padding: '0.25rem 0.625rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {stats.unassigned}
                  </span>
                )}
              </TabsTrigger>
            </div>
            <div style={{
              padding: '0.75rem 1.25rem',
              fontSize: '1rem',
              fontWeight: '500',
              color: '#666666',
              marginBottom: '-2px',
              display: 'inline-block'
            }}>
              <TabsTrigger 
                value="active"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#006798] data-[state=active]:text-[#006798] data-[state=active]:font-semibold data-[state=active]:bg-transparent bg-transparent border-b-2 border-transparent rounded-none p-0 h-auto"
              >
                Active
                {stats?.allActive > 0 && (
                  <span style={{
                    marginLeft: '0.5rem',
                    backgroundColor: '#006798',
                    color: 'white',
                    padding: '0.25rem 0.625rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {stats.allActive}
                  </span>
                )}
              </TabsTrigger>
            </div>
            <div style={{
              padding: '0.75rem 1.25rem',
              fontSize: '1rem',
              fontWeight: '500',
              color: '#666666',
              marginBottom: '-2px',
              display: 'inline-block'
            }}>
              <TabsTrigger 
                value="archive"
                className="data-[state=active]:border-b-2 data-[state=active]:border-[#006798] data-[state=active]:text-[#006798] data-[state=active]:font-semibold data-[state=active]:bg-transparent bg-transparent border-b-2 border-transparent rounded-none p-0 h-auto"
              >
                Archive
                {stats?.archived > 0 && (
                  <span style={{
                    marginLeft: '0.5rem',
                    backgroundColor: '#006798',
                    color: 'white',
                    padding: '0.25rem 0.625rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {stats.archived}
                  </span>
                )}
              </TabsTrigger>
            </div>
          </TabsList>
        </div>

        <TabsContent value="myQueue">
          <SubmissionTable submissions={myQueue} emptyMessage="Tidak ada submission di My Queue." />
        </TabsContent>

        <TabsContent value="unassigned">
          <SubmissionTable submissions={unassigned} emptyMessage="Tidak ada submission yang belum ditugaskan." />
        </TabsContent>

        <TabsContent value="active">
          <SubmissionTable submissions={active} emptyMessage="Tidak ada submission aktif." />
        </TabsContent>

        <TabsContent value="archive">
          <SubmissionTable submissions={archived} emptyMessage="Tidak ada submission yang diarsipkan." />
        </TabsContent>
      </Tabs>
    </section>
  );
}
