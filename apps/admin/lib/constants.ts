/**
 * Data Protection Constants
 *
 * PROJECTS_CUTOFF_DATE marks the boundary between "protected initial data" and "user-created data"
 * All records created on or before this date cannot be deleted through the admin UI
 * This protects against accidental data loss from the initial dataset
 */

const PROJECTS_CUTOFF_DATE = new Date("2025-11-18T15:13:00.044Z");

/**
 * Check if a record is protected (created before or on cutoff date)
 * Protected records cannot be deleted by users
 */
export function isRecordProtected(createdAt: Date | string): boolean {
  const recordDate =
    typeof createdAt === "string" ? new Date(createdAt) : createdAt;
  return recordDate <= PROJECTS_CUTOFF_DATE;
}
