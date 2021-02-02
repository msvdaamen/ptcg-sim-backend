
export function subscriptionUserCheck(context, userId: number) {
    return context.connection.context.currentUser.id === userId;
}
