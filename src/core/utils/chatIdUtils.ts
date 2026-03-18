export const generateRoomId = (userId1: string, userId2: string): string => {
    const sortedIds = [userId1, userId2].sort();
    return `room_${sortedIds[0]}_${sortedIds[1]}`;
};
