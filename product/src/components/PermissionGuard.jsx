import React from 'react';
import authService from '../service/auth.service';

/**
 * A component that conditionally renders its children based on user permissions
 * 
 * @param {object} props
 * @param {string|string[]} props.permissions - A single permission or array of permissions (will show if user has ANY of them)
 * @param {boolean} props.renderNoAccess - Whether to render the noAccess content when user doesn't have permission (default: false)
 * @param {ReactNode} props.children - Content to render if user has permission
 * @param {ReactNode} props.noAccess - Content to render if user doesn't have permission
 * @returns {ReactNode}
 */
const PermissionGuard = ({ permissions, renderNoAccess = false, children, noAccess }) => {
  // Convert single permission to array
  const permissionList = Array.isArray(permissions) ? permissions : [permissions];
  
  // Check if user has any of the required permissions
  const hasAccess = permissionList.some(permission => authService.hasPermission(permission));
  
  if (hasAccess) {
    return children;
  } else if (renderNoAccess && noAccess) {
    return noAccess;
  } else {
    return null;
  }
};

export default PermissionGuard; 