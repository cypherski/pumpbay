// src/lib/utils/date.ts
export function getTimeframeStart(timeframe: '24h' | '7d' | '30d'): Date {
    const now = new Date()
    switch (timeframe) {
      case '24h':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000)
      case '7d':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      case '30d':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    }
  }
  
  export function getDateRangeArray(startDate: Date, endDate: Date): Date[] {
    const dates: Date[] = []
    let currentDate = new Date(startDate)
  
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
  
    return dates
  }