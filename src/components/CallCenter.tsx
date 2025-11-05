import { useState } from 'react';
import { Phone, Clock, TrendingUp, PlayCircle, Download, X, Mic } from 'lucide-react';
import { calls } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CallCenter() {
  const [selectedCall, setSelectedCall] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const sentimentColors: Record<string, string> = {
    positive: 'bg-green-100 text-green-700 border-green-200',
    neutral: 'bg-gray-100 text-gray-700 border-gray-200',
    negative: 'bg-red-100 text-red-700 border-red-200'
  };

  const sentimentLabels: Record<string, string> = {
    positive: 'Позитивный',
    neutral: 'Нейтральный',
    negative: 'Негативный'
  };

  const totalCalls = calls.length;
  const avgDuration = Math.round(calls.reduce((sum, call) => sum + call.duration, 0) / calls.length);
  const positiveCalls = calls.filter(c => c.sentiment === 'positive').length;
  const avgScore = (calls.reduce((sum, call) => sum + (call.aiScore || 0), 0) / calls.length).toFixed(1);

  const handlePlayRecording = (callId: string) => {
    setSelectedCall(callId);
    setIsPlaying(true);
    // Simulate playing for 3 seconds
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-1">Колл-центр</h2>
          <p className="text-gray-500 text-sm">Управление звонками и анализ качества</p>
        </div>
        <button className="px-4 py-2 bg-[#E60012] text-white rounded-lg hover:bg-[#b00010] transition-colors flex items-center gap-2">
          <Mic className="w-4 h-4" />
          <span className="text-sm">Начать звонок</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-50 border-2 border-[#E60012] rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-[#E60012]" />
            </div>
            <p className="text-gray-500 text-sm">Всего звонков</p>
          </div>
          <p className="text-gray-900">{totalCalls}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gray-100 border-2 border-black rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-black" />
            </div>
            <p className="text-gray-500 text-sm">Средняя длительность</p>
          </div>
          <p className="text-gray-900">{formatDuration(avgDuration)}</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-50 border-2 border-green-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-gray-500 text-sm">Позитивных</p>
          </div>
          <p className="text-gray-900">{positiveCalls} ({Math.round(positiveCalls/totalCalls*100)}%)</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-50 border-2 border-yellow-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-gray-500 text-sm">Средняя оценка ИИ</p>
          </div>
          <p className="text-gray-900">{avgScore}/10</p>
        </div>
      </div>

      {/* Feature Image */}
      <div className="relative h-32 rounded-xl overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCWUQlMjBjYXIlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjAxOTQ4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="BYD Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center px-6">
          <div>
            <h3 className="text-white mb-1">Интеграция с AI анализом</h3>
            <p className="text-gray-200 text-sm">Автоматический анализ качества звонков</p>
          </div>
        </div>
      </div>

      {/* Call List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-5 border-b border-gray-200">
          <h3 className="text-gray-900">История звонков</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {calls.map((call) => (
            <div key={call.id} className="p-5 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      call.type === 'incoming' ? 'bg-green-100 border-2 border-green-600' : 'bg-[#E60012]/10 border-2 border-[#E60012]'
                    }`}>
                      <Phone className={`w-5 h-5 ${
                        call.type === 'incoming' ? 'text-green-600' : 'text-[#E60012]'
                      }`} />
                    </div>
                    <div>
                      <h4 className="text-gray-900">{call.customerName}</h4>
                      <p className="text-sm text-gray-500">
                        {call.type === 'incoming' ? 'Входящий' : 'Исходящий'} • {formatTime(call.timestamp)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 ml-13">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs border border-gray-200">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {formatDuration(call.duration)}
                    </span>
                    {call.sentiment && (
                      <span className={`px-2 py-1 rounded text-xs border ${sentimentColors[call.sentiment]}`}>
                        {sentimentLabels[call.sentiment]}
                      </span>
                    )}
                    {call.aiScore && (
                      <span className="px-2 py-1 bg-[#E60012]/10 text-[#E60012] rounded text-xs border border-[#E60012]/20">
                        Оценка ИИ: {call.aiScore}/10
                      </span>
                    )}
                  </div>

                  {call.aiNotes && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg ml-13 border border-blue-200">
                      <p className="text-xs text-blue-700 mb-1">🤖 ИИ Рекомендации:</p>
                      <p className="text-sm text-gray-700">{call.aiNotes}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 lg:flex-col lg:items-end">
                  <p className="text-xs text-gray-500">Оператор:</p>
                  <p className="text-sm text-gray-900">{call.agentName}</p>
                  <div className="flex gap-2 mt-2">
                    {call.recorded && (
                      <button 
                        onClick={() => handlePlayRecording(call.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          selectedCall === call.id && isPlaying
                            ? 'bg-[#E60012] text-white'
                            : 'text-[#E60012] hover:bg-red-50'
                        }`}
                      >
                        <PlayCircle className="w-5 h-5" />
                      </button>
                    )}
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Target */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-gray-900 mb-4">Цель на сегодня: 30 звонков</h3>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Дилноза Рахимова</span>
              <span className="text-sm text-gray-900">28/30</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#E60012] h-2 rounded-full transition-all" style={{ width: '93%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Шахзод Усманов</span>
              <span className="text-sm text-gray-900">25/30</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-black h-2 rounded-full transition-all" style={{ width: '83%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}