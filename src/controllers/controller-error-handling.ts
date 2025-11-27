export function validId(id: string) {
  const num = Number(id);
  if (isNaN(num)) {
    throw {
      status: 400,
      message: 'Please enter a valid user_id'
    };
  }
  return num;
}
export function isUser(user) {
  if (user.length === 0) {
    throw {
      status: 404,
      message: 'Sorry, this user does not exist'
    };
  } else return user;
}
export function ValidGameId(game_id: any) {
  const check = Number(game_id);
  if (Number.isNaN(check)) {
    throw {
      status: 400,
      message: 'Please enter a valid game_id'
    };
  } else return game_id;
}
export function isGame(game_id: number) {
  
}