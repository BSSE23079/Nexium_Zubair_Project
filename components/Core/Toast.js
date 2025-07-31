// This is a placeholder for a more advanced toast notification system.
// For a real-world app, consider using a library like 'react-hot-toast'.

export default function Toast({ message, type = 'info' }) {
    if (!message) return null;

    const styles = {
        padding: '1rem',
        margin: '1rem auto',
        maxWidth: '500px',
        borderRadius: '4px',
        color: 'white',
        backgroundColor: type === 'error' ? '#e53e3e' : '#48bb78',
    };

    return <div style={styles}>{message}</div>;
}