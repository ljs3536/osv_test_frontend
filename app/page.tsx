"use client";

import { useState } from "react";
import axios from "axios";
import FileUpload from "../components/FileUpload";
import VulnerabilityList, {
  PackageResult,
} from "../components/VulnerabilityList";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<PackageResult[]>([]);

  // 파일과 선택된 생태계(ecosystem)를 파라미터로 받음
  const handleAnalyze = async (file: File, ecosystem: string) => {
    setIsLoading(true);
    setResults([]);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("ecosystem", ecosystem); // 백엔드의 Form(...)으로 매핑됨

      const response = await axios.post(
        "http://localhost:8000/api/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setResults(response.data.results);
    } catch (error) {
      console.error("분석 실패:", error);
      alert("파일 분석 중 서버 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            OSV 멀티 스캐너
          </h1>
          <p className="text-lg text-gray-600">
            Python, Node.js, Java 의존성 파일을 업로드하고 취약점을 즉시
            확인하세요.
          </p>
        </div>

        <FileUpload onAnalyze={handleAnalyze} isLoading={isLoading} />
        <VulnerabilityList results={results} />
      </div>
    </main>
  );
}
