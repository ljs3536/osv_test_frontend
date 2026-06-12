"use client";

import { useState } from "react";

// onAnalyze에 ecosystem 파라미터 추가
interface FileUploadProps {
  onAnalyze: (file: File, ecosystem: string) => void;
  isLoading: boolean;
}

export default function FileUpload({ onAnalyze, isLoading }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ecosystem, setEcosystem] = useState<string>("pypi");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onAnalyze(selectedFile, ecosystem);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        의존성 파일 업로드
      </h2>

      {/* 생태계 선택 라디오 버튼 */}
      <div className="flex gap-4 mb-6">
        <label
          className={`flex-1 flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${ecosystem === "pypi" ? "bg-blue-50 border-blue-500 text-blue-700 font-semibold" : "hover:bg-gray-50"}`}
        >
          <input
            type="radio"
            name="ecosystem"
            value="pypi"
            className="hidden"
            checked={ecosystem === "pypi"}
            onChange={() => setEcosystem("pypi")}
          />
          Python (requirements.txt)
        </label>
        <label
          className={`flex-1 flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${ecosystem === "npm" ? "bg-blue-50 border-blue-500 text-blue-700 font-semibold" : "hover:bg-gray-50"}`}
        >
          <input
            type="radio"
            name="ecosystem"
            value="npm"
            className="hidden"
            checked={ecosystem === "npm"}
            onChange={() => setEcosystem("npm")}
          />
          Node.js (package.json)
        </label>
        <label
          className={`flex-1 flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${ecosystem === "maven" ? "bg-blue-50 border-blue-500 text-blue-700 font-semibold" : "hover:bg-gray-50"}`}
        >
          <input
            type="radio"
            name="ecosystem"
            value="maven"
            className="hidden"
            checked={ecosystem === "maven"}
            onChange={() => setEcosystem("maven")}
          />
          Java (pom.xml)
        </label>
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">클릭하여 파일 선택</span> 또는
              드래그 앤 드롭
            </p>
          </div>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>

      {selectedFile && (
        <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md text-sm flex justify-between">
          <span>
            선택된 파일:{" "}
            <span className="font-semibold">{selectedFile.name}</span>
          </span>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!selectedFile || isLoading}
        className={`mt-4 w-full py-3 rounded-lg font-bold text-white transition-colors ${
          !selectedFile || isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isLoading ? "스캐닝 진행 중..." : "취약점 분석 시작"}
      </button>
    </div>
  );
}
