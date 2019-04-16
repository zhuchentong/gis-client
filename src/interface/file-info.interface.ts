/**
 * 文件类型接口
 */
export interface IFileInfo {
  /**
   * 文件ID
   */
  fileId: string
  /**
   * 文件类型
   */
  fileType: string
  /**
   * 文件名称（后端存储）
   */
  fileName?: string
  /**
   * 扩展名称
   */
  extensionName?: string
  /**
   * 源文件名称
   */
  originalName?: string
  /**
   * 文件URL
   */
  url?: string
}
