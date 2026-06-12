// app/page.tsx
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

  const handleAnalyze = async (file: File) => {
    setIsLoading(true);
    setResults([]); // 새로운 분석 시작 시 기존 결과 초기화

    try {
      // 1. FormData에 파일 담기 (multipart/form-data)
      const formData = new FormData();
      formData.append("file", file);

      // 2. FastAPI 백엔드로 POST 요청
      const response = await axios.post(
        "http://localhost:8000/api/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // 3. 결과 업데이트
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
            OSV 취약점 스캐너
          </h1>
          <p className="text-lg text-gray-600">
            의존성 파일을 업로드하고 알려진 오픈소스 취약점을 즉시 확인하세요.
          </p>
        </div>

        <FileUpload onAnalyze={handleAnalyze} isLoading={isLoading} />
        <VulnerabilityList results={results} />
      </div>
    </main>
  );
}
