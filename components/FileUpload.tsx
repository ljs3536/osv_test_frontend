"use client";

import { useState } from "react";

interface FileUploadProps {
  onAnalyze: (file: File) => void;
  isLoading: boolean;
}

export default function FileUpload({ onAnalyze, isLoading }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onAnalyze(selectedFile);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        의존성 파일 업로드
      </h2>
      <div className="flex flex-col items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">클릭하여 파일 선택</span> 또는
              드래그 앤 드롭
            </p>
            <p className="text-xs text-gray-500">
              package.json, requirements.txt 등
            </p>
          </div>
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>

      {selectedFile && (
        <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
          선택된 파일:{" "}
          <span className="font-semibold">{selectedFile.name}</span>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!selectedFile || isLoading}
        className={`mt-4 w-full py-2.5 rounded-lg font-semibold text-white transition-colors ${
          !selectedFile || isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isLoading ? "분석 중..." : "취약점 분석 시작"}
      </button>
    </div>
  );
}
