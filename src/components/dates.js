const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// "2025-06" -> "Jun 2025", "2025" -> "2025", "" -> "".
export const formatDate = (value) => {
    if (!value) return '';
    const [year, month] = value.split('-');
    return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
};

// A missing end date means the entry is ongoing.
export const formatRange = (start, end) => {
    if (!start) return formatDate(end);
    return `${formatDate(start)} – ${end ? formatDate(end) : 'Present'}`;
};
