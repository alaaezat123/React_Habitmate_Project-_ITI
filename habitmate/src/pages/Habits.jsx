import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaSun,
    FaMoon,
    FaPlusCircle,
    FaTimesCircle,
    FaCheckCircle,
    FaTrashAlt,
    FaStar,
    FaSeedling,
    FaChartLine, // For logging icon
    FaCalendarAlt, // For days logged
    FaTasks, // For current progress
    FaArrowLeft, FaArrowRight // For quantity increase/decrease in modal
} from 'react-icons/fa';

// A selection of emojis for habits
const emojiOptions = ['📚', '🏋️‍♀️', '📝', '🧘‍♂️', '💧', '🍎', '💡', '⏰', '🚶‍♀️', '😴', '✏️', '💻', '💰'];

// A selection of background images (replace with actual image URLs if deployed)
const habitBackgroundImages = {
    '📚': 'https://images.unsplash.com/photo-1512820790803-830f6b6ce8f8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    '🏋️‍♀️': 'https://images.unsplash.com/photo-1549476465-9a67448d30e3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB4bWFnfHx8fGVufDB8fHx8fA%3D%3D',
    '📝': 'https://images.unsplash.com/photo-1456324504439-368ee42a5308?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    '🧘‍♂️': 'https://images.unsplash.com/photo-1599876250682-1a40348a4362?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    '💧': 'https://images.unsplash.com/photo-1589417830601-5231c518b319?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    '🍎': 'https://images.unsplash.com/photo-1579613832368-8090886a0799?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    '💡': 'https://images.unsplash.com/photo-1510931580227-023a19b8417c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    '⏰': 'https://images.unsplash.com/photo-1563294326-787d1df7b055?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    '🚶‍♀️': 'https://images.unsplash.com/photo-1536767645167-73d88b488775?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    '😴': 'https://images.unsplash.com/photo-1559869670-3d748f34d193?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    '✏️': 'https://images.unsplash.com/photo-1516942918451-c0a76a5912e5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    '💻': 'https://images.unsplash.com/photo-1498050108023-c5249f4cd085?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    '💰': 'https://images.unsplash.com/photo-1579621970795-87facc2f935d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    '🚀': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

// Helper function to format date to YYYY-MM-DD
const formatDate = (date) => date.toISOString().split('T')[0];

// Helper to get start/end of current cycle (weekly/monthly)
const getCycleDates = (date, cycle) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0); // Normalize to start of day

    if (cycle === 'daily') {
        return { start: formatDate(d), end: formatDate(d) };
    } else if (cycle === 'weekly') {
        const dayOfWeek = d.getDay(); // 0 for Sunday, 6 for Saturday
        const startOfWeek = new Date(d);
        startOfWeek.setDate(d.getDate() - dayOfWeek);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return { start: formatDate(startOfWeek), end: formatDate(endOfWeek) };
    } else if (cycle === 'monthly') {
        const startOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
        const endOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0); // Last day of month
        return { start: formatDate(startOfMonth), end: formatDate(endOfMonth) };
    }
    return { start: '', end: '' }; // Fallback
};

// Helper to calculate streak (consecutive days with logs for binary, or successful days for quantity)
const calculateStreak = (logs, trackingType) => {
    if (logs.length === 0) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let currentStreak = 0;
    let lastDateInStreak = null;

    // Filter and sort logs relevant for streak calculation
    const relevantLogs = logs.filter(log => {
            const logDate = new Date(log.date);
            logDate.setHours(0, 0, 0, 0);
            return logDate <= today; // Only consider logs up to today
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort ascending by date

    if (relevantLogs.length === 0) return 0;

    // Check today or yesterday for initial streak
    // Go backwards from today
    for (let i = 0; i < 2; i++) { // Check today and yesterday
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        const formattedCheckDate = formatDate(checkDate);

        const logsForCheckDate = relevantLogs.filter(log => log.date === formattedCheckDate);

        let isSuccessfulDay = false;
        if (trackingType === 'binary') {
            isSuccessfulDay = logsForCheckDate.some(log => log.value === 1);
        } else { // quantity
            // For simplicity, a day is considered "successful" if any quantity was logged.
            // A more complex streak would require comparing to a daily equivalent of the goal.
            isSuccessfulDay = logsForCheckDate.some(log => log.value > 0);
        }

        if (isSuccessfulDay) {
            currentStreak++;
            lastDateInStreak = checkDate;
        } else {
            break; // Gap found or not done today/yesterday
        }
    }

    if (currentStreak === 0) return 0; // If today/yesterday wasn't successful, no active streak

    // Continue checking previous days
    let currentDate = new Date(lastDateInStreak);
    currentDate.setDate(currentDate.getDate() - 1); // Move to the day before the last successful day

    while (true) {
        const formattedCurrentDate = formatDate(currentDate);
        const logsForCurrentDate = relevantLogs.filter(log => log.date === formattedCurrentDate);

        let isSuccessfulDay = false;
        if (trackingType === 'binary') {
            isSuccessfulDay = logsForCurrentDate.some(log => log.value === 1);
        } else { // quantity
            isSuccessfulDay = logsForCurrentDate.some(log => log.value > 0);
        }

        if (isSuccessfulDay) {
            currentStreak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break; // Gap found
        }
    }

    return currentStreak;
};


function HabitTrackerCreative() {
    const [habits, setHabits] = useState([
        { id: 1, name: 'Read', goal: 30, trackingType: 'quantity', goalCycle: 'daily', icon: '📚', backgroundImage: habitBackgroundImages['📚'], logs: [{ date: formatDate(new Date()), value: 25 }, { date: formatDate(new Date(Date.now() - 86400000)), value: 30 }, { date: formatDate(new Date(Date.now() - 2 * 86400000)), value: 28 }] },
        { id: 2, name: 'Exercise', goal: 3, trackingType: 'binary', goalCycle: 'weekly', icon: '🏋️‍♀️', backgroundImage: habitBackgroundImages['🏋️‍♀️'], logs: [{ date: formatDate(new Date(Date.now() - 86400000)), value: 1 }, { date: formatDate(new Date(Date.now() - 3 * 86400000)), value: 1 }] },
        { id: 3, name: 'Journal', goal: 7, trackingType: 'binary', goalCycle: 'weekly', icon: '📝', backgroundImage: habitBackgroundImages['📝'], logs: [] },
        { id: 4, name: 'Meditate', goal: 5, trackingType: 'quantity', goalCycle: 'weekly', icon: '🧘‍♂️', backgroundImage: habitBackgroundImages['🧘‍♂️'], logs: [{ date: formatDate(new Date()), value: 2 }, { date: formatDate(new Date(Date.now() - 2 * 86400000)), value: 3 }] },
    ]);

    const [newHabit, setNewHabit] = useState('');
    const [newHabitGoal, setNewHabitGoal] = useState(7);
    const [newHabitTrackingType, setNewHabitTrackingType] = useState('binary');
    const [newHabitGoalCycle, setNewHabitGoalCycle] = useState('weekly');
    const [newHabitIcon, setNewHabitIcon] = useState(emojiOptions[0]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showLogModal, setShowLogModal] = useState(null); // Stores habit ID for which modal is open
    const [logCount, setLogCount] = useState(1); // For quantity input
    const [logDate, setLogDate] = useState(formatDate(new Date())); // Default to today's date
    const [theme, setTheme] = useState('dark');

    const quantumGrowthTheme = {
        backgroundPrimary: `radial-gradient(circle at 50% 50%, #060612 0%, #020208 100%)`, // Slightly darker base
        backgroundPattern: `repeating-linear-gradient(0deg, rgba(50, 200, 255, 0.01) 0px, rgba(50, 200, 255, 0.01) 1px, transparent 1px, transparent 100px), repeating-linear-gradient(90deg, rgba(50, 200, 255, 0.01) 0px, rgba(50, 200, 255, 0.01) 1px, transparent 1px, transparent 100px)`, // Lighter pattern opacity
        nodeBaseBg: 'rgba(10, 10, 20, 0.6)', // Slightly less transparent
        nodeActiveBg: 'rgba(25, 25, 50, 0.7)', // Slightly less transparent
        nodeBorderStart: '#7B2CFF', // More vibrant purple
        nodeBorderEnd: '#00FFFF', // Cyan
        nodeInnerHighlight: 'rgba(255, 255, 255, 0.08)', // More subtle highlight
        nodeShadowColor: 'rgba(0, 0, 0, 0.6)', // Softer shadow
        textColorPrimary: '#E0E6F6', // Off-white/light blue
        textColorSecondary: '#B0C4DE', // Light steel blue
        accentGlowBase: '#00FA9A', // Bright green
        accentGlowHighlight: '#FFD700', // Gold
        buttonGradientStart: '#7B2CFF',
        buttonGradientEnd: '#00CED1', // Darker turquoise
        buttonShadow: 'rgba(0, 0, 0, 0.4)', // Softer button shadow
        completedColor: '#32CD32', // Lime green
        deleteColor: '#FF6347', // Tomato
        warningColor: '#FFD700', // Gold
        dangerColor: '#DC143C', // Crimson
        getGlow: (color, intensity = 1) => `
            0 0 ${8 * intensity}px ${color}A0,
            0 0 ${16 * intensity}px ${color}60,
            0 0 ${24 * intensity}px ${color}40
        `, // Softer, more diffuse glow
        getInnerShadow: (color, intensity = 1) => `
            inset 0 0 ${4 * intensity}px ${color}A0,
            inset 0 0 ${8 * intensity}px ${color}60
        ` // Softer inner shadow
    };

    const lightOrganicTheme = {
        backgroundPrimary: `radial-gradient(circle at 50% 50%,rgb(224, 231, 243) 0%,rgb(242, 242, 247) 100%)`, // Brighter white
        backgroundPattern: `repeating-linear-gradient(0deg, rgba(0, 150, 136, 0.01) 0px, rgba(0, 150, 136, 0.01) 1px, transparent 1px, transparent 100px), repeating-linear-gradient(90deg, rgba(0, 150, 136, 0.01) 0px, rgba(0, 150, 136, 0.01) 1px, transparent 1px, transparent 100px)`, // Lighter pattern opacity
        nodeBaseBg: 'rgba(210, 212, 231, 0.85)', // More opaque
        nodeActiveBg: 'rgb(204, 211, 226)', // More opaque
        nodeBorderStart: '#66BB6A', // Light green
        nodeBorderEnd: '#26C6DA', // Light blue
        nodeInnerHighlight: 'rgb(55, 64, 90)', // Very subtle highlight
        nodeShadowColor: 'rgb(40, 56, 201)', // Much softer shadow
        textColorPrimary: '#212121', // Darker text
        textColorSecondary: '#757575', // Gray text
        accentGlowBase: '#66BB6A', // Light green
        accentGlowHighlight: '#FFD54F', // Amber
        buttonGradientStart: '#66BB6A',
        buttonGradientEnd: '#26C6DA',
        buttonShadow: 'rgba(16, 52, 255, 0)', // Very soft button shadow
        completedColor: '#4CAF50', // Green
        deleteColor: '#FF5722', // Deep orange
        warningColor: '#FFC107', // Amber
        dangerColor: '#D32F2F', // Red
        getGlow: (color, intensity = 1) => `
            0 0 ${8 * intensity}px ${color}A0,
            0 0 ${16 * intensity}px ${color}60,
            0 0 ${24 * intensity}px ${color}40
        `, // Softer, more diffuse glow
        getInnerShadow: (color, intensity = 1) => `
            inset 0 0 ${4 * intensity}px ${color}A0,
            inset 0 0 ${8 * intensity}px ${color}60
        ` // Softer inner shadow
    };

    const currentTheme = theme === 'dark' ? quantumGrowthTheme : lightOrganicTheme;

    const handleAddHabit = (e) => {
        e.preventDefault();
        if (newHabit.trim() === '') return;
        setHabits([...habits, {
            id: Date.now(),
            name: newHabit,
            goal: newHabitGoal,
            trackingType: newHabitTrackingType,
            goalCycle: newHabitGoalCycle,
            icon: newHabitIcon,
            backgroundImage: habitBackgroundImages[newHabitIcon] || habitBackgroundImages['🚀'],
            logs: [],
        }]);
        setNewHabit('');
        setNewHabitGoal(7);
        setNewHabitTrackingType('binary');
        setNewHabitGoalCycle('weekly');
        setNewHabitIcon(emojiOptions[0]);
        setShowAddForm(false);
    };

    // --- Core Logging Logic ---
    const handleLogProtocolAction = (habitId) => {
        setHabits(prevHabits => prevHabits.map(habit => {
            if (habit.id === habitId) {
                if (habit.trackingType === 'binary') {
                    const todayFormatted = formatDate(new Date());
                    const todayLogIndex = habit.logs.findIndex(log => log.date === todayFormatted && log.value === 1);

                    if (todayLogIndex !== -1) {
                        // Already logged for today, remove the log (unmark)
                        const updatedLogs = [...habit.logs];
                        updatedLogs.splice(todayLogIndex, 1);
                        return { ...habit, logs: updatedLogs };
                    } else {
                        // Not logged for today, add a new log
                        return { ...habit, logs: [...habit.logs, { date: todayFormatted, value: 1 }] };
                    }
                } else { // quantity
                    // For quantity, open the modal
                    setShowLogModal(habitId);
                    setLogCount(1); // Reset count for new entry
                    setLogDate(formatDate(new Date())); // Default to today's date
                    return habit; // Return habit as is, it will be updated by modal submission
                }
            }
            return habit;
        }));
    };

    const handleQuantityLogSubmit = (habitId) => {
        if (logCount <= 0 || !logDate) {
            alert('Please enter a valid count and date.');
            return;
        }

        setHabits(prevHabits =>
            prevHabits.map(habit =>
                habit.id === habitId
                    ? {
                        ...habit,
                        // Find if there's an existing log for today and update it, otherwise add new
                        logs: (() => {
                            const todayFormatted = formatDate(new Date());
                            const existingLogIndex = habit.logs.findIndex(log => log.date === logDate);
                            if (existingLogIndex !== -1) {
                                const updatedLogs = [...habit.logs];
                                updatedLogs[existingLogIndex] = { ...updatedLogs[existingLogIndex], value: updatedLogs[existingLogIndex].value + parseInt(logCount) };
                                return updatedLogs;
                            } else {
                                return [...habit.logs, { date: logDate, value: parseInt(logCount) }];
                            }
                        })(),
                    }
                    : habit
            )
        );
        setShowLogModal(null); // Close modal
        setLogCount(1); // Reset log count
        setLogDate(formatDate(new Date())); // Reset date
    };

    const handleDeleteHabit = (id) => {
        if (window.confirm("Are you sure you want to dissolve this protocol?")) {
            setHabits(prevHabits => prevHabits.filter(habit => habit.id !== id));
        }
    };

    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const interval = setInterval(() => {
            setBgOffset(prev => ({
                x: (prev.x + 0.01) % 100, // Slower movement
                y: (prev.y + 0.01) % 100, // Slower movement
            }));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: `${currentTheme.backgroundPrimary}, ${currentTheme.backgroundPattern}`,
            backgroundSize: '200% 200%, 100% 100%',
            backgroundPosition: `${bgOffset.x}% ${bgOffset.y}%, 0 0`,
            color: currentTheme.textColorPrimary,
            fontFamily: '"Exo 2", sans-serif',
            padding: '20px',
            transition: 'background 0.8s ease',
            overflow: 'hidden',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
        }}>
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                borderRadius: '40px',
                boxShadow: currentTheme.getGlow(currentTheme.accentGlowBase, 0.2), // Softer initial glow
                pointerEvents: 'none',
                animation: 'pulseAura 5s infinite alternate ease-in-out',
                zIndex: -1,
                opacity: theme === 'dark' ? 0.8 : 0.4, // Reduced opacity for lighter background
            }}></div>

            <style>{`
                @keyframes pulseAura {
                    0% {
                        box-shadow: ${currentTheme.getGlow(currentTheme.accentGlowBase, 0.2)};
                    }
                    100% {
                        box-shadow: ${currentTheme.getGlow(currentTheme.accentGlowHighlight, 0.3)}; // Softer pulse glow
                    }
                }
                body { margin: 0; } /* Ensure no default body margin */
            `}</style>

            <div style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                padding: '10px',
                maxWidth: '1200px',
                width: '100%',
                position: 'relative',
                zIndex: 1,
            }}>
                <h1 style={{
                    textAlign: 'center',
                    marginBottom: '40px',
                    fontSize: '4em',
                    color: currentTheme.textColorPrimary,
                    textShadow: currentTheme.getGlow(currentTheme.accentGlowHighlight, 0.8), // Softer text glow
                    fontWeight: 'bolder',
                    fontFamily: '"Oswald", sans-serif',
                    letterSpacing: '4px',
                    padding: '10px 0',
                    borderBottom: `2px solid ${currentTheme.nodeBorderStart}30`,
                }}>
                    <FaSeedling style={{ marginRight: '20px', color: currentTheme.accentGlowBase, transform: 'rotate(5deg)' }} /> Quantum Growth Protocols
                </h1>

                <motion.button
                    onClick={toggleTheme}
                    whileHover={{ scale: 1.1, rotate: 10, boxShadow: currentTheme.getGlow(currentTheme.accentGlowBase, 0.4) }} // Softer hover glow
                    whileTap={{ scale: 0.9 }}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        padding: '12px 25px', // Slightly smaller
                        background: currentTheme.nodeBaseBg,
                        backdropFilter: 'blur(10px)', // Softer blur
                        border: `1px solid ${currentTheme.nodeBorderStart}40`, // Softer border
                        borderRadius: '40px', // Softer border radius
                        cursor: 'pointer',
                        boxShadow: `0 3px 10px ${currentTheme.nodeShadowColor}`, // Softer shadow
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px', // Smaller gap
                        fontSize: '1em', // Slightly smaller font
                        fontWeight: 'bold',
                        color: currentTheme.textColorPrimary,
                        transition: 'all 0.3s ease',
                        zIndex: 10,
                        textShadow: currentTheme.getGlow(currentTheme.textColorPrimary, 0.1), // Softer text glow
                    }}
                >
                    {theme === 'dark' ? <FaMoon size={20} style={{ color: currentTheme.nodeBorderEnd }} /> : <FaSun size={20} style={{ color: currentTheme.nodeBorderStart }} />}
                    Switch Core
                </motion.button>

                <motion.button
                    onClick={() => setShowAddForm(prev => !prev)}
                    whileHover={{ scale: 1.03, boxShadow: currentTheme.getGlow(currentTheme.accentGlowHighlight, 0.6) }} // Softer hover glow
                    whileTap={{ scale: 0.97 }}
                    style={{
                        padding: '20px 40px', // Slightly smaller padding
                        marginTop: '20px',
                        marginBottom: '40px',
                        background: `linear-gradient(90deg, ${currentTheme.buttonGradientStart}, ${currentTheme.buttonGradientEnd})`,
                        color: currentTheme.textColorPrimary,
                        border: 'none',
                        borderRadius: '60px', // Slightly smaller border radius
                        cursor: 'pointer',
                        boxShadow: `0 8px 25px ${currentTheme.buttonShadow}`, // Softer shadow
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '15px', // Smaller gap
                        margin: '0 auto 40px auto',
                        fontSize: '1.3em', // Slightly smaller font
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '2px', // Smaller letter spacing
                        textShadow: currentTheme.getGlow(currentTheme.textColorPrimary, 0.2), // Softer text glow
                    }}
                >
                    {showAddForm ? <FaTimesCircle size={25} /> : <FaPlusCircle size={25} />}
                    {showAddForm ? 'Terminate Sequence' : 'Initiate New Protocol'}
                </motion.button>

                <AnimatePresence>
                    {showAddForm && (
                        <motion.form
                            onSubmit={handleAddHabit}
                            initial={{ opacity: 0, y: -50, scale: 0.8 }} // Softer initial animation
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -50, scale: 0.8 }}
                            transition={{ duration: 0.5, type: 'spring', damping: 25, stiffness: 200 }} // Adjusted spring physics
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '20px', // Smaller gap
                                marginBottom: '40px',
                                backgroundColor: currentTheme.nodeActiveBg,
                                backdropFilter: 'blur(15px)', // Softer blur
                                border: `2px solid ${currentTheme.nodeBorderStart}50`, // Softer border
                                borderRadius: '30px', // Softer border radius
                                boxShadow: currentTheme.getGlow(currentTheme.accentGlowBase, 0.15), // Softer glow
                                padding: '40px', // Smaller padding
                                width: '90%',
                                maxWidth: '600px', // Slightly smaller max width
                                alignSelf: 'center',
                                position: 'relative',
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Designate new growth protocol (Name)..."
                                value={newHabit}
                                onChange={(e) => setNewHabit(e.target.value)}
                                required
                                style={{
                                    padding: '18px 30px', // Smaller padding
                                    borderRadius: '35px', // Smaller border radius
                                    border: `2px solid ${currentTheme.accentGlowBase}40`, // Softer border
                                    width: '90%',
                                    fontSize: '1.2em', // Smaller font
                                    backgroundColor: 'transparent',
                                    color: currentTheme.textColorPrimary,
                                    outline: 'none',
                                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                    boxShadow: `${currentTheme.getInnerShadow(currentTheme.accentGlowBase, 0.08)}, ${currentTheme.getGlow(currentTheme.accentGlowBase, 0.08)}`, // Softer shadows
                                    '::placeholder': { color: currentTheme.textColorSecondary + '80' },
                                }}
                            />
                            <input
                                type="number"
                                placeholder="Set target goal (e.g., 7 times, 50 pages)..."
                                value={newHabitGoal}
                                onChange={(e) => setNewHabitGoal(Math.max(1, parseInt(e.target.value) || 1))}
                                min="1"
                                required
                                style={{
                                    padding: '18px 30px',
                                    borderRadius: '35px',
                                    border: `2px solid ${currentTheme.accentGlowBase}40`,
                                    width: '90%',
                                    fontSize: '1.2em',
                                    backgroundColor: 'transparent',
                                    color: currentTheme.textColorPrimary,
                                    outline: 'none',
                                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                    boxShadow: `${currentTheme.getInnerShadow(currentTheme.accentGlowBase, 0.08)}, ${currentTheme.getGlow(currentTheme.accentGlowBase, 0.08)}`,
                                    '::placeholder': { color: currentTheme.textColorSecondary + '80' },
                                }}
                            />
                            <div style={{ display: 'flex', gap: '15px', width: '90%', justifyContent: 'center', flexWrap: 'wrap' }}> {/* Added flexWrap */}
                                <label style={{ fontSize: '1.1em', color: currentTheme.textColorSecondary, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    Tracking Type:
                                    <select
                                        value={newHabitTrackingType}
                                        onChange={(e) => setNewHabitTrackingType(e.target.value)}
                                        style={{
                                            padding: '8px 12px', // Smaller padding
                                            borderRadius: '12px', // Smaller border radius
                                            border: `1px solid ${currentTheme.nodeBorderEnd}40`, // Softer border
                                            backgroundColor: currentTheme.nodeBaseBg, // Use base background for select
                                            color: currentTheme.textColorPrimary,
                                            fontSize: '0.9em', // Smaller font
                                            outline: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <option value="binary" style={{ backgroundColor: currentTheme.nodeActiveBg, color: currentTheme.textColorPrimary }}>Binary (Yes/No)</option>
                                        <option value="quantity" style={{ backgroundColor: currentTheme.nodeActiveBg, color: currentTheme.textColorPrimary }}>Quantity (Number)</option>
                                    </select>
                                </label>
                                <label style={{ fontSize: '1.1em', color: currentTheme.textColorSecondary, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    Goal Cycle:
                                    <select
                                        value={newHabitGoalCycle}
                                        onChange={(e) => setNewHabitGoalCycle(e.target.value)}
                                        style={{
                                            padding: '8px 12px',
                                            borderRadius: '12px',
                                            border: `1px solid ${currentTheme.nodeBorderEnd}40`,
                                            backgroundColor: currentTheme.nodeBaseBg,
                                            color: currentTheme.textColorPrimary,
                                            fontSize: '0.9em',
                                            outline: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <option value="daily" style={{ backgroundColor: currentTheme.nodeActiveBg, color: currentTheme.textColorPrimary }}>Daily</option>
                                        <option value="weekly" style={{ backgroundColor: currentTheme.nodeActiveBg, color: currentTheme.textColorPrimary }}>Weekly</option>
                                        <option value="monthly" style={{ backgroundColor: currentTheme.nodeActiveBg, color: currentTheme.textColorPrimary }}>Monthly</option>
                                    </select>
                                </label>
                            </div>

                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                gap: '12px', // Smaller gap
                                width: '90%',
                                marginTop: '15px', // Smaller margin
                                padding: '12px 0', // Smaller padding
                                borderTop: `1px dashed ${currentTheme.textColorSecondary}30`, // Softer dashed line
                                borderBottom: `1px dashed ${currentTheme.textColorSecondary}30`,
                            }}>
                                {emojiOptions.map(emoji => (
                                    <motion.span
                                        key={emoji}
                                        onClick={() => setNewHabitIcon(emoji)}
                                        whileHover={{ scale: 1.3, rotate: 15, textShadow: currentTheme.getGlow(currentTheme.accentGlowHighlight, 0.3) }} // Softer hover effects
                                        whileTap={{ scale: 0.9 }}
                                        style={{
                                            cursor: 'pointer',
                                            fontSize: '2em', // Slightly smaller emojis
                                            padding: '8px', // Smaller padding
                                            borderRadius: '15px', // Smaller border radius
                                            backgroundColor: newHabitIcon === emoji ? `${currentTheme.nodeInnerHighlight}` : 'transparent',
                                            border: newHabitIcon === emoji ? `2px solid ${currentTheme.nodeBorderEnd}80` : '2px solid transparent', // Softer border
                                            boxShadow: newHabitIcon === emoji ? currentTheme.getGlow(currentTheme.accentGlowHighlight + '50', 0.3) : 'none', // Softer glow
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        {emoji}
                                    </motion.span>
                                ))}
                            </div>
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.03, boxShadow: currentTheme.getGlow(currentTheme.accentGlowBase, 0.6) }} // Softer hover glow
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    padding: '18px 35px', // Smaller padding
                                    background: `linear-gradient(90deg, ${currentTheme.buttonGradientEnd}, ${currentTheme.buttonGradientStart})`,
                                    color: currentTheme.textColorPrimary,
                                    borderRadius: '35px', // Smaller border radius
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.2em', // Smaller font
                                    fontWeight: 'bold',
                                    boxShadow: `0 6px 20px ${currentTheme.buttonShadow}`, // Softer shadow
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px', // Smaller gap
                                    marginTop: '25px', // Smaller margin
                                    textShadow: currentTheme.getGlow(currentTheme.textColorPrimary, 0.15), // Softer text glow
                                }}
                            >
                                <FaPlusCircle size={22} /> Confirm Protocol
                            </motion.button>
                        </motion.form>
                    )}
                </AnimatePresence>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', // Slightly smaller minmax
                    gap: '35px', // Smaller gap
                    paddingTop: '25px', // Smaller padding
                }}>
                    <AnimatePresence>
                        {habits.map(habit => {
                            const { start: cycleStart, end: cycleEnd } = getCycleDates(new Date(), habit.goalCycle);

                            const currentCycleLogs = habit.logs.filter(log =>
                                log.date >= cycleStart && log.date <= cycleEnd
                            );

                            let currentProgress = 0; // Quantity for quantity, count for binary
                            let daysCompletedInCycle = 0; // Unique days with logged activity in the cycle
                            let todayProgress = 0; // Progress specifically for today

                            if (habit.trackingType === 'binary') {
                                const uniqueBinaryDates = new Set(currentCycleLogs.filter(log => log.value === 1).map(log => log.date));
                                currentProgress = uniqueBinaryDates.size;
                                daysCompletedInCycle = uniqueBinaryDates.size;
                                todayProgress = habit.logs.some(log => log.date === formatDate(new Date()) && log.value === 1) ? 1 : 0;
                            } else { // quantity
                                currentProgress = currentCycleLogs.reduce((sum, log) => sum + log.value, 0);
                                daysCompletedInCycle = new Set(currentCycleLogs.map(log => log.date)).size;
                                const todayLog = habit.logs.find(log => log.date === formatDate(new Date()));
                                todayProgress = todayLog ? todayLog.value : 0;
                            }

                            const completionRate = habit.goal > 0 ? Math.round((currentProgress / habit.goal) * 100) : 0;
                            const activeStreak = calculateStreak(habit.logs, habit.trackingType);
                            const totalDaysLogged = new Set(habit.logs.map(log => log.date)).size; // Total unique days with any log

                            let rateColor = currentTheme.textColorPrimary;
                            let rateGlowIntensity = 0.2; // Base intensity
                            let isGoalMet = completionRate >= 100;

                            if (isGoalMet) {
                                rateColor = currentTheme.completedColor;
                                rateGlowIntensity = 0.8; // Brighter glow for completion
                            } else if (completionRate >= 70) {
                                rateColor = currentTheme.accentGlowHighlight;
                                rateGlowIntensity = 0.6;
                            } else if (completionRate >= 30) {
                                rateColor = currentTheme.nodeBorderEnd;
                                rateGlowIntensity = 0.4;
                            } else {
                                rateColor = currentTheme.dangerColor;
                                rateGlowIntensity = 0.5;
                            }

                            const isLoggedTodayBinary = habit.trackingType === 'binary' && habit.logs.some(log => log.date === formatDate(new Date()) && log.value === 1);

                            return (
                                <motion.div
                                    key={habit.id}
                                    initial={{ opacity: 0, y: 60, scale: 0.7 }} // Softer initial animation
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -60, scale: 0.7 }}
                                    transition={{ duration: 0.7, type: 'spring', damping: 25, stiffness: 220 }} // Adjusted spring physics
                                    whileHover={{
                                        scale: 1.03, // Slightly less aggressive scale
                                        y: -10, // Less vertical lift
                                        boxShadow: `${currentTheme.getGlow(currentTheme.nodeBorderEnd, 0.4)}, 0 15px 40px ${currentTheme.nodeShadowColor}`, // Softer hover glow
                                        transition: { duration: 0.2 } // Faster transition
                                    }}
                                    whileTap={{ scale: 0.98 }} // Less aggressive tap
                                    style={{
                                        borderRadius: '30px', // Softer border radius
                                        boxShadow: `${currentTheme.getGlow(currentTheme.nodeBorderStart, 0.2)}, 0 10px 30px ${currentTheme.nodeShadowColor}`, // Softer initial shadow
                                        color: currentTheme.textColorPrimary,
                                        position: 'relative',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        minHeight: '380px', // Slightly smaller min height
                                        overflow: 'hidden',
                                        background: `url(${habit.backgroundImage}) center center / cover no-repeat`,
                                        border: `2px solid ${isGoalMet ? currentTheme.completedColor : currentTheme.nodeBorderStart + '40'}`, // Softer border
                                        transition: 'all 0.3s ease', // Faster transition
                                        cursor: 'default', // Changed to default as buttons handle clicks
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        top: 0, left: 0, width: '100%', height: '100%',
                                        backgroundColor: currentTheme.nodeBaseBg,
                                        backdropFilter: 'blur(10px)', // Softer blur for overlay
                                        zIndex: 0,
                                    }}></div>

                                    <div style={{
                                        position: 'relative',
                                        zIndex: 1,
                                        padding: '25px', // Smaller padding
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: '100%',
                                    }}>
                                        <div style={{
                                            fontSize: '3.5em', // Smaller icon
                                            marginBottom: '15px', // Smaller margin
                                            filter: `drop-shadow(${currentTheme.getGlow(currentTheme.accentGlowHighlight, 0.3)})`, // Softer glow
                                        }}>
                                            {habit.icon}
                                        </div>
                                        <h3 style={{
                                            margin: '0 0 15px 0', // Smaller margin
                                            fontSize: '1.8em', // Smaller font
                                            fontWeight: 'bold',
                                            textShadow: currentTheme.getGlow(currentTheme.textColorPrimary, 0.1), // Softer text glow
                                            textAlign: 'center',
                                        }}>
                                            {habit.name}
                                        </h3>
                                        <p style={{
                                            fontSize: '1.1em', // Smaller font
                                            color: currentTheme.textColorSecondary,
                                            marginBottom: '10px', // Smaller margin
                                            textAlign: 'center',
                                        }}>
                                            Goal: {habit.goal} {habit.trackingType === 'binary' ? 'times' : 'units'} per {habit.goalCycle}
                                        </p>

                                        <div style={{
                                            marginTop: '10px',
                                            width: '80%',
                                            backgroundColor: currentTheme.nodeInnerHighlight,
                                            borderRadius: '15px',
                                            height: '18px', // Thinner progress bar
                                            overflow: 'hidden',
                                            border: `1px solid ${currentTheme.nodeBorderStart}50`, // Softer border
                                            boxShadow: currentTheme.getInnerShadow(currentTheme.nodeBorderStart, 0.1), // Softer inner shadow
                                        }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${Math.min(100, completionRate)}%` }}
                                                transition={{ duration: 0.8, ease: "easeOut" }}
                                                style={{
                                                    height: '100%',
                                                    background: `linear-gradient(90deg, ${currentTheme.accentGlowBase}, ${currentTheme.nodeBorderEnd})`,
                                                    borderRadius: '15px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-end',
                                                    paddingRight: '5px',
                                                    fontSize: '0.9em', // Smaller font
                                                    color: currentTheme.textColorPrimary,
                                                    fontWeight: 'bold',
                                                    textShadow: currentTheme.getGlow(currentTheme.textColorPrimary, 0.1),
                                                }}
                                            >
                                                {completionRate}%
                                            </motion.div>
                                        </div>
                                        <p style={{
                                            fontSize: '1em', // Smaller font
                                            color: currentTheme.textColorSecondary,
                                            marginTop: '10px', // Smaller margin
                                        }}>
                                            <FaTasks size={14} style={{ marginRight: '5px' }} />
                                            Current: {currentProgress} / {habit.goal}
                                        </p>
                                        {habit.trackingType === 'quantity' && (
                                            <p style={{
                                                fontSize: '1em',
                                                color: currentTheme.textColorSecondary,
                                            }}>
                                                <FaChartLine size={14} style={{ marginRight: '5px' }} />
                                                Today: {todayProgress} {todayProgress > 0 ? '(logged)' : '(not logged)'}
                                            </p>
                                        )}

                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-around',
                                            width: '90%',
                                            marginTop: '20px', // Smaller margin
                                            padding: '10px 0', // Smaller padding
                                            borderTop: `1px dashed ${currentTheme.textColorSecondary}30`,
                                        }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <FaStar size={20} style={{ color: currentTheme.accentGlowHighlight, marginBottom: '5px' }} />
                                                <p style={{ margin: 0, fontSize: '1em', color: currentTheme.textColorSecondary }}>Streak: {activeStreak} days</p>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <FaCalendarAlt size={20} style={{ color: currentTheme.nodeBorderEnd, marginBottom: '5px' }} />
                                                <p style={{ margin: 0, fontSize: '1em', color: currentTheme.textColorSecondary }}>Days Logged: {totalDaysLogged}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{
                                        position: 'relative',
                                        zIndex: 1,
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '15px', // Smaller gap
                                        padding: '20px 0', // Smaller padding
                                        backgroundColor: currentTheme.nodeActiveBg + 'AA', // More transparent footer
                                        backdropFilter: 'blur(8px)', // Softer blur
                                        borderTop: `1px solid ${currentTheme.nodeBorderStart}30`, // Softer border
                                        borderBottomLeftRadius: '30px', // Match card radius
                                        borderBottomRightRadius: '30px', // Match card radius
                                    }}>
                                        {habit.trackingType === 'binary' ? (
                                            <motion.button
                                                onClick={() => handleLogProtocolAction(habit.id)}
                                                whileHover={{ scale: 1.05, boxShadow: currentTheme.getGlow(isLoggedTodayBinary ? currentTheme.warningColor : currentTheme.completedColor, 0.5) }}
                                                whileTap={{ scale: 0.95 }}
                                                style={{
                                                    padding: '15px 30px', // Smaller padding
                                                    background: isLoggedTodayBinary ? `linear-gradient(45deg, ${currentTheme.warningColor}, ${currentTheme.dangerColor})` : `linear-gradient(45deg, ${currentTheme.completedColor}, ${currentTheme.accentGlowBase})`,
                                                    color: currentTheme.textColorPrimary,
                                                    border: 'none',
                                                    borderRadius: '30px', // Smaller border radius
                                                    cursor: 'pointer',
                                                    boxShadow: `0 4px 15px ${currentTheme.buttonShadow}`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px', // Smaller gap
                                                    fontSize: '1.1em', // Smaller font
                                                    fontWeight: 'bold',
                                                    textShadow: currentTheme.getGlow(currentTheme.textColorPrimary, 0.15),
                                                }}
                                            >
                                                {isLoggedTodayBinary ? <FaTimesCircle size={20} /> : <FaCheckCircle size={20} />}
                                                {isLoggedTodayBinary ? 'Unmark Today' : 'Mark as Done Today'}
                                            </motion.button>
                                        ) : (
                                            <motion.button
                                                onClick={() => handleLogProtocolAction(habit.id)}
                                                whileHover={{ scale: 1.05, boxShadow: currentTheme.getGlow(currentTheme.accentGlowBase, 0.5) }}
                                                whileTap={{ scale: 0.95 }}
                                                style={{
                                                    padding: '15px 30px',
                                                    background: `linear-gradient(45deg, ${currentTheme.accentGlowBase}, ${currentTheme.nodeBorderEnd})`,
                                                    color: currentTheme.textColorPrimary,
                                                    border: 'none',
                                                    borderRadius: '30px',
                                                    cursor: 'pointer',
                                                    boxShadow: `0 4px 15px ${currentTheme.buttonShadow}`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px',
                                                    fontSize: '1.1em',
                                                    fontWeight: 'bold',
                                                    textShadow: currentTheme.getGlow(currentTheme.textColorPrimary, 0.15),
                                                }}
                                            >
                                                <FaChartLine size={20} /> Log Progress
                                            </motion.button>
                                        )}
                                        <motion.button
                                            onClick={() => handleDeleteHabit(habit.id)}
                                            whileHover={{ scale: 1.05, boxShadow: currentTheme.getGlow(currentTheme.deleteColor, 0.5) }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{
                                                padding: '15px', // Smaller padding
                                                background: currentTheme.deleteColor,
                                                color: currentTheme.textColorPrimary,
                                                border: 'none',
                                                borderRadius: '50%', // Circular button
                                                cursor: 'pointer',
                                                boxShadow: `0 4px 15px ${currentTheme.buttonShadow}`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.1em',
                                                fontWeight: 'bold',
                                                textShadow: currentTheme.getGlow(currentTheme.textColorPrimary, 0.15),
                                                width: '50px', // Fixed size
                                                height: '50px', // Fixed size
                                            }}
                                        >
                                            <FaTrashAlt size={20} />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {showLogModal && (
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ duration: 0.4, type: 'spring', damping: 20, stiffness: 150 }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: currentTheme.nodeActiveBg,
                            backdropFilter: 'blur(20px)', // Stronger blur for modal
                            border: `3px solid ${currentTheme.nodeBorderStart}`,
                            borderRadius: '30px',
                            boxShadow: currentTheme.getGlow(currentTheme.accentGlowHighlight, 0.5),
                            padding: '40px',
                            zIndex: 1000,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '25px',
                            width: '90%',
                            maxWidth: '450px',
                            color: currentTheme.textColorPrimary,
                        }}
                    >
                        <h2 style={{
                            margin: 0,
                            fontSize: '2em',
                            textShadow: currentTheme.getGlow(currentTheme.textColorPrimary, 0.2),
                        }}>Log Progress</h2>
                        <input
                            type="date"
                            value={logDate}
                            onChange={(e) => setLogDate(e.target.value)}
                            style={{
                                padding: '15px 20px',
                                borderRadius: '20px',
                                border: `2px solid ${currentTheme.accentGlowBase}50`,
                                backgroundColor: 'transparent',
                                color: currentTheme.textColorPrimary,
                                fontSize: '1.1em',
                                outline: 'none',
                                width: '80%',
                            }}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <motion.button
                                onClick={() => setLogCount(prev => Math.max(1, prev - 1))}
                                whileHover={{ scale: 1.1, backgroundColor: currentTheme.deleteColor }}
                                whileTap={{ scale: 0.9 }}
                                style={{
                                    padding: '12px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    backgroundColor: currentTheme.nodeBorderStart,
                                    color: currentTheme.textColorPrimary,
                                    cursor: 'pointer',
                                    fontSize: '1.5em',
                                    boxShadow: `0 2px 10px ${currentTheme.buttonShadow}`,
                                }}
                            >
                                <FaArrowLeft />
                            </motion.button>
                            <input
                                type="number"
                                value={logCount}
                                onChange={(e) => setLogCount(parseInt(e.target.value) || 1)}
                                min="1"
                                style={{
                                    padding: '15px 20px',
                                    borderRadius: '20px',
                                    border: `2px solid ${currentTheme.accentGlowBase}50`,
                                    backgroundColor: 'transparent',
                                    color: currentTheme.textColorPrimary,
                                    fontSize: '1.4em',
                                    textAlign: 'center',
                                    width: '100px',
                                    outline: 'none',
                                }}
                            />
                            <motion.button
                                onClick={() => setLogCount(prev => prev + 1)}
                                whileHover={{ scale: 1.1, backgroundColor: currentTheme.completedColor }}
                                whileTap={{ scale: 0.9 }}
                                style={{
                                    padding: '12px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    backgroundColor: currentTheme.nodeBorderEnd,
                                    color: currentTheme.textColorPrimary,
                                    cursor: 'pointer',
                                    fontSize: '1.5em',
                                    boxShadow: `0 2px 10px ${currentTheme.buttonShadow}`,
                                }}
                            >
                                <FaArrowRight />
                            </motion.button>
                        </div>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <motion.button
                                onClick={() => handleQuantityLogSubmit(showLogModal)}
                                whileHover={{ scale: 1.05, boxShadow: currentTheme.getGlow(currentTheme.completedColor, 0.4) }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '12px 25px',
                                    background: `linear-gradient(45deg, ${currentTheme.completedColor}, ${currentTheme.accentGlowBase})`,
                                    color: currentTheme.textColorPrimary,
                                    border: 'none',
                                    borderRadius: '25px',
                                    cursor: 'pointer',
                                    fontSize: '1.1em',
                                    fontWeight: 'bold',
                                    boxShadow: `0 4px 15px ${currentTheme.buttonShadow}`,
                                }}
                            >
                                Submit Log
                            </motion.button>
                            <motion.button
                                onClick={() => setShowLogModal(null)}
                                whileHover={{ scale: 1.05, boxShadow: currentTheme.getGlow(currentTheme.dangerColor, 0.4) }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '12px 25px',
                                    background: `linear-gradient(45deg, ${currentTheme.dangerColor}, ${currentTheme.warningColor})`,
                                    color: currentTheme.textColorPrimary,
                                    border: 'none',
                                    borderRadius: '25px',
                                    cursor: 'pointer',
                                    fontSize: '1.1em',
                                    fontWeight: 'bold',
                                    boxShadow: `0 4px 15px ${currentTheme.buttonShadow}`,
                                }}
                            >
                                Cancel
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default HabitTrackerCreative;