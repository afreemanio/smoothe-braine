import { ParameterizedContext } from 'koa';
import Router from 'koa-router';
import _ from 'lodash';

import { RoleGuard } from '@backend/middleware/role.guard';
import {
  CLIENT_ERROR,
  CreateUserSchema,
  IdSchema,
  RoleSchema,
  RoleValues,
  SERVER_ERROR,
  SUCCESS,
  SearchSchema,
  UserRoleType,
  UserValues,
} from '@libs/shared';
import { ParamGuard, SchemaGuard } from '@backend/middleware';
import { LobbyHelper } from '.';
import { SessionGuard } from '@backend/middleware/session.guard';

// import { UserHelper } from '.';
import PouchDB from 'pouchdb';
import twilio, { Twilio } from 'twilio';
import { Server } from 'socket.io';

const router: Router = new Router();
const db = new PouchDB<VideoRoom>('video_rooms');
/************************************************
 * routes
 ************************************************/
export interface VideoRoom {
  _id: string;
  _rev: string;
  breakouts: string[];
}

interface MainRoomItem {
  _id: string;
  name: string;
  breakouts: BreakoutRoomItem[];
}

interface BreakoutRoomItem {
  _id: string;
  name: string;
}

const twilioClient = new Twilio(process.env.TWILIO_API_KEY as string, process.env.TWILIO_API_SECRET as string, {
  accountSid: process.env.TWILIO_ACCOUNT_SID as string,
});

/**
 * Testing value!
 */
router.post('/createRoom', SessionGuard(), RoleGuard([UserRoleType.USER]), async (ctx: ParameterizedContext) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // Get the room name from the request body.
  // If no room name is provided, the name will be set to the room's SID.

  if (!ctx.session) {
    return;
  }
  const myUser = ctx.session.user;
  const myUserId: string = myUser.userId;
  const result = await LobbyHelper.create(myUserId);

  const roomName: string = result.lobbyId;

  try {
    // Call the Twilio video API to create the new room.
    const room = await twilioClient.video.rooms.create({
      uniqueName: roomName,
      type: 'group',
    });

    const mainRoom: VideoRoom = {
      _id: room.sid,
      _rev: '',
      breakouts: [],
    };

    try {
      // Save the document in the db.
      await db.put(mainRoom);

      ctx.body = { room: mainRoom, lobby: result };

      return;
    } catch (error) {
      ctx.body = 'Error creating room...';
    }
  } catch (error) {
    // If something went wrong, handle the error.
    ctx.body = 'Error creating room...';
  }
}); // {get} /user/me

router.post('/getToken:roomSid', async (ctx: ParameterizedContext) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { roomSid } = ctx.params;
  const AccessToken = twilio.jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;

  const myUserId: string = (ctx.state as any).userId;

  const result = await LobbyHelper.create(myUserId);

  // Get the user's identity and roomSid from the query.
  const identity = myUserId;

  // Create the access token.
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID as string,
    process.env.TWILIO_API_KEY as string,
    process.env.TWILIO_API_SECRET as string,
    { identity: identity as string },
  );

  token.identity = identity;

  // Add a VideoGrant to the token to allow the user of this token to use Twilio Video
  const grant = new VideoGrant({ room: roomSid as string });
  token.addGrant(grant);

  ctx.body = { accessToken: token.toJwt() };
}); // {get} /user/me

/**
 * Testing value!
 */
router.get('/', async (ctx: ParameterizedContext) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx.body = 'Hello World';
}); // {get} /user/me

router.post('/', SessionGuard(), RoleGuard([UserRoleType.USER]), async (ctx: ParameterizedContext) => {
  // router.post('/', async (ctx: ParameterizedContext) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const myUserId: string = (ctx.state as any).userId;

  const result = await LobbyHelper.create(myUserId);

  ctx.body = result;
}); // {get} /user/me

export { router as LobbyController };
