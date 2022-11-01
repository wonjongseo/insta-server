export const THROW_EXCEPTION = (error) => {
  return {
    ok: false,
    error,
  };
};

export const USER_NOT_FOUND = {
  ok: false,
  error: "ユーザーが見つかりません",
};

export const INVALID_AUTHOTICATION = {
  ok: false,
  error: "権限がありません",
};
export const PHOTO_NOT_FOUND = {
  ok: false,
  error: "写真が見つかりません",
};

export const ROOM_NOT_FOUND = {
  ok: false,
  error: "ルームが見つかりません",
};
export const COMMENT_NOT_FOUND = {
  ok: false,
  error: "コメントが見つかりません",
};

export const HASHTAG_NOT_FOUND = {
  ok: false,
  error: "ハッシュタグが見つかりません",
};
