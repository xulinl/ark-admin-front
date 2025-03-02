import { AppstoreAddOutlined, CreditCardOutlined, CommentOutlined } from '@ant-design/icons-vue'

const icons = {
  AppstoreAddOutlined,
  CreditCardOutlined,
}
export default icons
// 定义图标名称的联合类型
type IconNames = keyof typeof icons
export function getIcon(iconName: IconNames): (typeof icons)[IconNames] {
  return icons[iconName] || icons.AppstoreAddOutlined
}
