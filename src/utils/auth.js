import Cookies from 'js-cookie'

const TokenKey = 'admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 角色
const RoleKey = 'admin-Role'
export function getRole() {
  return Cookies.get(RoleKey)
}

export function setRole(role) {
  return Cookies.set(RoleKey, role)
}

export function removeRole() {
  return Cookies.remove(RoleKey)
}

// 用户名
const UserNameKey = 'admin-User-Name'
export function getUserName() {
  return Cookies.get(UserNameKey)
}

export function setUserName(name) {
  return Cookies.set(UserNameKey, name)
}

export function removeUserName() {
  return Cookies.remove(UserNameKey)
}

// 菜单
const MenuKey = 'admin-Menu'
export function getMenu() {
  return Cookies.get(MenuKey)
}

export function setMenu(menu) {
  return Cookies.set(MenuKey, menu)
}

export function removeMenu() {
  return Cookies.remove(MenuKey)
}