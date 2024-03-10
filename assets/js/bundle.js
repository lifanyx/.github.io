!function () {
    "use strict";
    class e {
        static i(...e) {
            this.flag && console.info(...e)
        }
        static l(...e) {
            this.flag && console.log(...e)
        }
        static e(...e) {
            this.flag && console.error(...e)
        }
        static w(...e) {
            this.flag && console.warn(...e)
        }
    }
    e.flag = !1;
    class t {
        static cycleObject(t, s, i = 0) {
            s && (0 == i ? (e.l("回收的对象: ----------------\x3e " + t), Laya.Pool.recover(t, s)) : (e.l("直接回收对象: ", s), Laya.Pool.recoverByClass(s)))
        }
    }
    class s {}
    s.drop_skins_path = ["battle/equip_box.png", "battle/safe_box.png", "common/gold_max.png"],
        s.drop_sk_path = ["drop/drop_item", "drop/drop_safe", "drop/drop_gold"],
        s.drop_prefab_path = ["prefabs/drop_weapon.json", "prefabs/drop_safe.json", "prefabs/drop_gold.json"],
        s.gun_types = ["shou", "chong", "san", "bu", "ju"],
        s.BUTTON_TYPE_SHARE = "share",
        s.AWARD_TIP = "当前功能奖励次数上限",
        s.BUTTON_TYPE_VIDEO = "video",
        s.BUTTON_EVENT_NAME = ["offlineCommonAward", "offlineSuperAward", "powerGet", "powerClose", "knaspaceRecover", "knaspaceWeaponShop", "knaspaceHelmetShop", "knaspaceClothShop", "treasureGet", "treasureClose", "signCommonAward", "signSuperAward", "goldSpeed", "goldSpeedClose", "resultNext", "resultBackMain", "resultHelp", "shareGold", "shareGoldClose", "gunComplex", "elmetComplex", "clothComplex", "straightLevelUp"],
        s.NET_CONFIG_PATH = "config/",
        s.NET_MUSIC_PATH = "soundEff/",
        s.REQUIRE_SK_URL = "dragonbone/",
        s.VIDEO_ICON = "offline_speedup/video.png",
        s.ITEM_NAMES = ["gun_", "helmet_", "cloth_"];
    class i {
        static changeGoldUnit(e) {
            let t = "",
                s = e;
            return s < 1e4 ? s + "" : t = s < 1e7 ? (s /= Math.pow(10, 3)).toFixed(2) + "K" : s < 1e10 ? (s /= Math.pow(10, 6)).toFixed(2) + "M" : s < 1e13 ? (s /= Math.pow(10, 9)).toFixed(2) + "G" : (s /= Math.pow(10, 12)).toFixed(2) + "T"
        }
    }
    class a extends Laya.Script {
        onAwake() {
            this.gold = this.owner.getChildByName("gold"),
                this.mul = this.owner.getChildByName("mul"),
                this.mul_icon = this.owner.getChildByName("mul_icon"),
                this.gold_pre_pos = this.gold.x
        }
        init(e, t) {
            this.gold.text = "+" + i.changeGoldUnit(e),
                1 === t ? (this.mul.visible = !1, this.mul_icon.visible = !1) : (this.mul.visible = !0, this.mul_icon.visible = !0, this.mul.loadImage("damage_number/damagered_num_" + t + ".png"))
        }
    }
    class n {
        static i(e, ...t) {
            this.flag && console.info(e, ...t)
        }
        static l(e, ...t) {
            this.flag && console.log(e, ...t)
        }
        static w(e, ...t) {
            this.flag && console.warn(e, ...t)
        }
        static e(e, ...t) {
            this.flag && console.error(e, ...t)
        }
    }
    n.flag = !1;
    class o {
        constructor() {
            o.init(),
                Laya.stage.on(Laya.Event.BLUR, this, this.stopGameMusic),
                Laya.stage.on(Laya.Event.FOCUS, this, this.resumeGameMusic)
        }
        static init() {
            Laya.SoundManager.autoReleaseSound = !1,
                Laya.SoundManager.autoStopMusic = !1,
                this.musicList = [],
                this.musicObjs = {},
                this.bgm = {}
        }
        static get Instance() {
            return this.instance || (this.instance = new o),
                this.instance
        }
        stopGameMusic() {
            o.stopGameSound = !0,
                Laya.SoundManager.stopMusic()
        }
        resumeGameMusic() {
            o.stopGameSound = !1,
            o.playCurrMusicFunc && o.playCurrMusicFunc()
        }
        static playGunSound(e) {
            this.playSound(0, e, 1)
        }
        static playBossSound(e) {
            this.playSound(1, e, 1)
        }
        static playSceneSound(e) {
            this.playSound(2, e, 1)
        }
        static playBgMusic(e) {
            this.stopGameSound || (this.playCurrMusicFunc = function () {
                Laya.SoundManager.playMusic(s.NET_MUSIC_PATH + "scene_sound/" + e + ".wav", 0)
            }, this.bgm[e] = Laya.SoundManager.playMusic(s.NET_MUSIC_PATH + "scene_sound/" + e + ".wav", 0))
        }
        static pauseBgMusic() {
            for (const e in this.bgm)
                if (this.bgm.hasOwnProperty(e)) {
                    this.bgm[e].stop()
                }
        }
        static gameOver() {
            this.stopSound("wheel"),
                this.stopSound("air_fly")
        }
        static playSkillSound(e) {
            this.playSound(2, e, 1)
        }
        static playSkillContinue(e) {
            this.playSound(2, e, 0)
        }
        static stopSound(e) {
            if (this.musicObjs[e]) {
                this.musicObjs[e].stop();
                let t = this.musicList.indexOf(this.musicObjs[e]);
                -1 != t && this.musicList.splice(t, 1)
            }
        }
        static playSound(e, t, s = 1) {
            if (this.stopGameSound)
                n.l("当前音效不可播放---------------------");
            else if (n.l("当前音效长度" + this.musicList.length), this.musicList.length < this.playerCount)
                this.musicObjs[t] = Laya.SoundManager.playSound(this.urls[e] + t + ".wav", s), this.musicList.push(this.musicObjs[t]);
            else
                for (let e = this.musicList.length - 1; e >= 0; e--) {
                    let t = this.musicList[e];
                    t && t.isStopped && this.musicList.splice(e, 1)
                }
        }
        clearStopSound() {}
    }
    var h,
        r,
        l,
        p,
        d,
        c;
    o.playerCount = 1,
        o.stopGameSound = !1,
        o.urls = [s.NET_MUSIC_PATH + "gun_sound/gun_", s.NET_MUSIC_PATH + "boss_sound/", s.NET_MUSIC_PATH + "scene_sound/"],
        function (e) {
            e[e.CN = 0] = "CN",
                e[e.EN = 1] = "EN"
        }
        (h || (h = {}));
    class u {
        static get Language() {
            return this.language || (this.language = h.CN),
                this.language
        }
        static setConfig(e) {
            this.data = e
        }
        static getLanguageType() {
            return 0 == this.language
        }
        static getLocalizationText(e) {
            if (this.data)
                for (let t = 0, s = this.data.length; t < s; ++t) {
                    let s = this.data[t];
                    if (s.ID === e)
                        switch (this.language) {
                            case h.EN:
                                return s.english;
                            case h.CN:
                                return s.chinese
                        }
                }
        }
    }
    !function (e) {
        e[e.CN = 0] = "CN",
            e[e.EN = 1] = "EN"
    }
    (r || (r = {})),
        function (e) {
            e[e.payStart = 0] = "payStart",
                e[e.paySuccess = 1] = "paySuccess",
                e[e.payFail = 2] = "payFail",
                e[e.tools = 3] = "tools",
                e[e.revive = 4] = "revive",
                e[e.award = 5] = "award"
        }
        (l || (l = {})),
        function (e) {
            e[e.complete = 0] = "complete",
                e[e.fail = 1] = "fail"
        }
        (p || (p = {})),
        function (e) {
            e[e.IOS = 0] = "IOS",
                e[e.Android = 1] = "Android",
                e[e.WeChat = 2] = "WeChat",
                e[e.QQ = 3] = "QQ"
        }
        (d || (d = {}));
    class m {
        constructor() {
            this.playerLoadOver = !1,
                this.enemyLoadOver = !1,
                this.count_load = 0,
                this.tempPool = {}
        }
        static get Instance() {
            return null !== this.instance && void 0 !== this.instance || (this.instance = new m, this.enemyDieArrs = [], this.instance.dropTemps = []),
                this.instance
        }
        initSpecialEnemy() {
            this.bombSelfTemp || (this.bombSelfTemp = this.getTemplet("enemy_sp/bomb_man_2"), this.flyManTemp = this.getTemplet("enemy_sp/flying_soldier"), this.oilDrumTemp = this.getTemplet("enemy_sp/oil_drum"))
        }
        getBombSelfEnemyTimer() {
            return this.bombSelfTimer || (this.bombSelfTimer = this.bombSelfTemp.getAniDuration(1)),
                this.bombSelfTimer
        }
        getFlyManTimer() {
            return this.flyManTimer || (this.flyManTimer = this.flyManTemp.getAniDuration(1)),
                this.flyManTimer
        }
        getOilDrumTimer() {
            return this.oilDrumTimer || (this.oilDrumTimer = this.oilDrumTemp.getAniDuration(2)),
                this.oilDrumTimer
        }
        initShootDirTemp() {
            this.shootDirTemp || (this.shootDirTemp = this.getTemplet("battle_target3"))
        }
        initGoldSpeedTemp() {
            if (!this.goldSpeedOverTemp) {
                let e = "mult_gold_";
                u.Language == r.EN && (e = "mult_gold_en_"),
                    this.goldSpeedOverTemp = this.getTemplet(e + "1"),
                    this.goldSpeedingTemp = this.getTemplet(e + "2"),
                    this.goldSpeedSettingTemp = this.getTemplet("mult_gold_4")
            }
        }
        initDropGood() {
            if (!this.dropTemps[0]) {
                for (let e = 0; e < 2; e++) {
                    let t = this.getTemplet(s.drop_sk_path[e]);
                    this.dropTemps[e] = t
                }
                this.dropTemps[2] || (this.dropTemps[2] = this.goldTemp)
            }
        }
        initGoldTmep() {
            if (!this.compose_tips) {
                this.targetTemp = this.getTemplet("target/gun_target_moving"),
                    this.compose_tips = [];
                let e = this.getTemplet("compose_tips"),
                    t = this.getTemplet("compose_tips_2");
                this.compose_tips.push(e, t),
                    this.signGoldTemp = this.getTemplet("get_gold")
            }
        }
        getComposeTip2Timer() {
            return void 0 !== this.composeTip2Time && null !== this.composeTip2Time || (this.composeTip2Time = this.compose_tips[1].getAniDuration(0)),
                this.composeTip2Time
        }
        addCompseTip2(e, t, s, i = !1) {
            this.getComposeTip2Timer();
            let a = this.getSkeleton("compose_tips_2");
            e.addChild(a),
                a.pos(t, s),
                a.play(0, i),
            i || Laya.timer.once(this.composeTip2Time, this, () => {
                this.cycleSkeleton("compose_tips_2", a),
                    a.removeSelf()
            })
        }
        getLoadingTimer() {
            return null != this.loadingTimer && null != this.loadingTimer || (this.loadingTimer = this.loadingTemps[0].getAniDuration(0)),
                this.loadingTimer
        }
        getAirBombTimer() {
            return null != this.airBombTimer && null != this.airBombTimer || (this.airBombTimer = this.airBombTemp.getAniDuration(0)),
                this.airBombTimer
        }
        getGoldTimer() {
            return null != this.goldTimer && null != this.goldTimer || (this.goldTimer = this.goldTemp.getAniDuration(0)),
                this.goldTimer
        }
        initEnemy() {
            if (!this.enemyTemp) {
                this.enemyTemp = this.getTemplet("enemy"),
                    this.atkTargetTemp = this.getTemplet("battle_target"),
                    this.specialEnemyTemp = [];
                let e = this.getTemplet("bomb_man"),
                    t = this.getTemplet("rpg_man");
                this.specialEnemyTemp.push(e, t),
                    this.specialEnemyBulletTemp = [];
                let s = this.getTemplet("bomb_man_bomb");
                this.specialEnemyBulletTemp.push(s),
                    this.bossTipTemp = this.getTemplet("boss_warning"),
                    this.airBombTemp = this.getTemplet("air_bomb_2"),
                    this.airTemp = this.getTemplet("air_bomb"),
                    this.enemyDieTemp = this.getTemplet("enemy_dead"),
                    this.bombTemp = this.getTemplet("bomb"),
                    this.bloodTemp = this.getTemplet("blood"),
                    this.smoke_rpg = this.getTemplet("smoke_2")
            }
        }
        initGo() {
            this.goTemp || (this.goTemp = this.getTemplet("start_go"))
        }
        playerCompleteOver() {
            this.playerLoadOver = !0
        }
        enemyCompleteOver() {
            this.enemyLoadOver = !0
        }
        getPlayerLoadOver() {
            return this.playerLoadOver
        }
        getEnemyLoadOver() {
            return this.enemyLoadOver
        }
        getTempletLoadOver() {
            return this.playerLoadOver
        }
        getEnemyPlayerTimer() {
            return void 0 !== this.enemyDiePlayerTime && null !== this.enemyDiePlayerTime || (this.enemyDiePlayerTime = this.enemyTemp.getAniDuration(6)),
                this.enemyDiePlayerTime
        }
        getSignGoldTimer() {
            return void 0 !== this.signGoldTimer && null !== this.signGoldTimer || (this.signGoldTimer = this.signGoldTemp.getAniDuration(0)),
                this.signGoldTimer
        }
        getEnemyDieTimer() {
            return void 0 !== this.enemyDieTime && null !== this.enemyDieTime || (this.enemyDieTime = this.enemyDieTemp.getAniDuration(0)),
                this.enemyDieTime
        }
        getSmokeTimer() {
            return void 0 !== this.smoke_timer && null !== this.smoke_timer || (this.smoke_timer = this.smoke_rpg.getAniDuration(0)),
                this.smoke_timer
        }
        getPlayerShootDirectionChangeTime() {
            return void 0 !== this.playerDirectionTime && null !== this.playerDirectionTime || (this.playerDirectionTime = this.playerTemp.getAniDuration(1)),
                this.playerDirectionTime
        }
        getAtkEffTimer() {
            return void 0 !== this.atkEffTimer && null !== this.atkEffTimer || (this.atkEffTimer = this.atkEffTemp.getAniDuration(0)),
                this.atkEffTimer
        }
        getSKILLEffTimer() {
            return void 0 !== this.bombTimer && null !== this.bombTimer || (this.bombTimer = this.bombTemp.getAniDuration(0)),
                this.bombTimer
        }
        getBloodEffTimer() {
            return void 0 !== this.bloodTimer && null !== this.bloodTimer || (this.bloodTimer = this.bloodTemp.getAniDuration(0)),
                this.bloodTimer
        }
        getAirTimer() {
            return void 0 !== this.airTimer && null !== this.airTimer || (this.airTimer = this.airTemp.getAniDuration(0)),
                this.airTimer
        }
        getPlayerShootTimer() {
            return void 0 !== this.shootTimer && null !== this.shootTimer || (this.shootTimer = this.playerTemp.getAniDuration(0)),
                this.shootTimer
        }
        addSkillEffSk(e, t, s, i = !1) {
            this.getSKILLEffTimer();
            let a = this.getSkeleton("bomb");
            e.addChild(a),
                a.pos(t, s),
                a.play(0, i),
            i || Laya.timer.once(this.bombTimer, this, () => {
                this.cycleSkeleton("bomb", a),
                    a.removeSelf()
            })
        }
        addEnemyDieAnimSK(e, t, s, i = !1) {
            let a = this.getSkeleton("enemy_dead");
            e.addChild(a),
                a.pos(t, s),
                a.play(0, i),
                m.enemyDieArrs.push(a)
        }
        addSmokeAnimSK(e, t, s, i = !1, a = 1, n = 0) {
            this.getSmokeTimer();
            let o = this.getSkeleton("smoke_2");
            e.addChild(o),
                o.pos(t, s),
                o.scale(a, a),
                o.rotation = n,
                o.play(0, i),
            i || Laya.timer.once(this.smoke_timer, this, () => {
                this.cycleSkeleton("smoke_2", o),
                    o.removeSelf()
            })
        }
        addAirSK(e, t, s, i = !1) {
            this.getAirTimer();
            let a = this.getSkeleton("air_bomb");
            e.addChild(a),
                a.pos(t, s),
                a.play(0, i),
            i || Laya.timer.once(this.airTimer, this, () => {
                this.cycleSkeleton("air_bomb", a),
                    a.removeSelf()
            })
        }
        getBossTipTime() {
            return void 0 !== this.bossTipTime && null !== this.bossTipTime || (this.bossTipTime = this.bossTipTemp.getAniDuration(0)),
                this.bossTipTime
        }
        addBossTipSK(e, t, s, i = !1) {
            this.getBossTipTime();
            let a = this.getSkeleton("boss_warning");
            e.addChild(a),
                a.pos(t, s),
                a.zOrder = 3,
                a.play(0, i),
            i || Laya.timer.once(this.bossTipTime, this, () => {
                this.cycleSkeleton("boss_warning", a),
                    a.removeSelf()
            })
        }
        addATKTargetSK(e, t, s, i = !0) {
            return this.atkTarget || (this.atkTarget = this.getSkeleton("battle_target"), this.atkTarget.name = "atk_target"),
                e.addChild(this.atkTarget),
                this.atkTarget.visible = !0,
                this.atkTarget.pos(t, s),
                this.atkTarget.play(0, i),
                this.atkTarget.zOrder = 2,
                this.atkTarget
        }
        changeAtkSite() {}
        initCommonTemp() {
            if (!this.firePlayerTmep) {
                this.firePlayerTmep = new Laya.Templet,
                    this.firePlayerTmep.parseData(Laya.loader.getRes(s.REQUIRE_SK_URL + "mult_gold_3.png"), Laya.loader.getRes(s.REQUIRE_SK_URL + "mult_gold_3.sk")),
                    this.safeBoxTemp = new Laya.Templet,
                    this.safeBoxTemp.parseData(Laya.loader.getRes(s.REQUIRE_SK_URL + "air_box.png"), Laya.loader.getRes(s.REQUIRE_SK_URL + "air_box.sk")),
                    this.goldTemp = new Laya.Templet,
                    this.goldTemp.parseData(Laya.loader.getRes(s.REQUIRE_SK_URL + "drop/drop_gold.png"), Laya.loader.getRes(s.REQUIRE_SK_URL + "drop/drop_gold.sk")),
                    this.playerTemp = new Laya.Templet,
                    this.playerTemp.on(Laya.Event.COMPLETE, this, this.playerCompleteOver),
                    this.playerTemp.parseData(Laya.loader.getRes(s.REQUIRE_SK_URL + "actor.png"), Laya.loader.getRes(s.REQUIRE_SK_URL + "actor.sk")),
                    this.atkEffTemp = new Laya.Templet,
                    this.atkEffTemp.parseData(Laya.loader.getRes(s.REQUIRE_SK_URL + "gun_fire_hit.png"), Laya.loader.getRes(s.REQUIRE_SK_URL + "gun_fire_hit.sk")),
                    this.loadingTemps = [];
                for (let e = 0; e < 3; e++) {
                    let t = new Laya.Templet;
                    t.parseData(Laya.loader.getRes(s.REQUIRE_SK_URL + "loading" + (e + 1) + ".png"), Laya.loader.getRes(s.REQUIRE_SK_URL + "loading" + (e + 1) + ".sk")),
                        this.loadingTemps.push(t)
                }
                this.fingerTemp = new Laya.Templet,
                    this.fingerTemp.parseData(Laya.loader.getRes(s.REQUIRE_SK_URL + "target_guide.png"), Laya.loader.getRes(s.REQUIRE_SK_URL + "target_guide.sk"))
            }
        }
        addSignGoldSk(e, s, i, n, h) {
            this.getSignGoldTimer();
            let r = this.getSkeleton("get_gold");
            e.addChild(r),
                r.pos(s + 375, i + 667),
                Laya.timer.frameOnce(10, this, () => {
                    r.play(0, !1)
                }),
            this.gold_number || (this.gold_number = new Laya.Prefab, this.gold_number.json = Laya.loader.getRes("prefabs/Gold_Tip.json"));
            let l = Laya.Pool.getItemByCreateFun("gold_award_pre", this.gold_number.create, this.gold_number),
                p = l.getComponent(a);
            e.addChild(l),
                l.y = 589 + i,
                l.x = s + 375,
                p.init(n, h),
                l.scale(.2, .2),
                Laya.Tween.to(l, {
                    scaleX: 1,
                    scaleY: 1
                }, 500, Laya.Ease.bounceOut),
                Laya.timer.once(this.signGoldTimer, this, () => {
                    o.playSceneSound("drop_goods"),
                        this.cycleSkeleton("get_gold", r),
                        r.removeSelf(),
                        t.cycleObject("gold_award_pre", l),
                        l.removeSelf()
                })
        }
        addATKEffSK(e, t, s, i = !1, a = 0) {
            this.getAtkEffTimer();
            let n = Laya.Pool.getItemByCreateFun("gun_fire_hit", this.atkEffTemp.buildArmature.bind(this.atkEffTemp, 0), this.atkEffTemp);
            e.addChild(n);
            let o = 10 * Math.random();
            s -= 3 * o,
                n.rotation = o + a,
                n.pos(t, s),
                n.scaleX = 1.2,
                n.scaleY = 1.2,
                n.play(0, i),
            i || Laya.timer.once(this.atkEffTimer, this, () => {
                this.cycleSkeleton("gun_fire_hit", n),
                    n.removeSelf()
            })
        }
        addPlayerSK(e, t, s, i, a, n = !1) {
            let o = m.Instance,
                h = o.playerTemp.buildArmature(1),
                r = o.playerTemp.buildArmature(1);
            e.addChild(h),
                e.addChild(r),
                r.pos(t, s),
                h.pos(t, s),
                h.play(a, n),
                r.play(i, n);
            return [function (e, t, s, i, a) {
                h.replaceSlotSkinByIndex("head", 0, t),
                    h.replaceSlotSkinByIndex("gun", 0, e),
                    h.replaceSlotSkinByIndex("gun_fire", 0, e),
                    h.replaceSlotSkinByIndex("cloth_out", 0, s),
                    h.replaceSlotSkinByIndex("cloth", 0, s),
                    r.replaceSlotSkinByIndex("head", 0, t),
                    r.replaceSlotSkinByIndex("gun", 0, e),
                    r.replaceSlotSkinByIndex("gun_fire", 0, e),
                    r.replaceSlotSkinByIndex("cloth_out", 0, s),
                    r.replaceSlotSkinByIndex("cloth", 0, s),
                    h.play(i, n),
                    r.play(a, n)
            }, r, h]
        }
        addPlayerStandSK(e, t, s, i = !1) {
            let a = m.Instance.playerTemp.buildArmature(1);
            return e.addChild(a),
                a.pos(t, s),
                a.play("walk_full", !1),
                a
        }
        addBloodSKEff(e, t, s, i = 1, a = !1) {
            let n = this.getSkeleton("blood");
            e.addChild(n);
            let o = 40;
            n.scaleY = i,
            1 !== i && (o = 0, n.scaleY = -i),
                n.scaleX = i,
                n.pos(t + o, s - 50),
                n.play(0, !1),
                Laya.timer.once(this.getBloodEffTimer(), this, () => {
                    this.cycleSkeleton("blood", n),
                        n.removeSelf()
                })
        }
        showGoldAward(e, s, i, a) {
            let n = Laya.Pool.createByClass(Laya.Text);
            n.text = "+" + s,
                n.color = "#FFFFFF",
                n.bold = !0,
                n.fontSize = 30,
                e.addChild(n),
                n.pos(i, a),
                n.alpha = 1;
            let o = a - 50,
                h = a - 100;
            Laya.Tween.to(n, {
                y: o
            }, 1e3, null, Laya.Handler.create(this, () => {
                Laya.Tween.to(n, {
                    y: h,
                    alpha: 0
                }, 1e3, null, Laya.Handler.create(this, () => {
                    t.cycleObject("", n, 1),
                        n.removeSelf()
                }))
            }))
        }
        recoverEnemyDieSk() {
            let e = m.enemyDieArrs;
            for (let t = 0; t < e.length; t++) {
                const s = e[t];
                m.Instance.cycleSkeleton("enemy_dead", s),
                    s.removeSelf()
            }
            m.enemyDieArrs = []
        }
        getTemplet(e) {
            let t = new Laya.Templet;
            return this.tempPool[e] = t,
                t.parseData(Laya.loader.getRes(s.REQUIRE_SK_URL + e + ".png"), Laya.loader.getRes(s.REQUIRE_SK_URL + e + ".sk")),
                t
        }
        cycleTemplate(e) {}
        getSkeleton(e, t = 0) {
            return Laya.Pool.getItemByCreateFun(e, this.tempPool[e].buildArmature.bind(this.tempPool[e], t), this.tempPool[e])
        }
        cycleSkeleton(e, s) {
            t.cycleObject(e, s)
        }
    }
    class g {}
    g.ButtonClicked = 1e3,
        g.LevelSuccess = 2e3,
        g.LevelFailed = 2010,
        g.CurrentLevel = 2020,
        g.TriggerShare = 3e3,
        g.ShareResult = 3010,
        g.ScreenShare = 3020,
        g.PlayVideoAD = 4e3,
        g.VideoADResult = 4010,
        g.PlayInterstitalAD = 4020,
        g.PlayGifAD = 4030,
        g.CloseBannerAD = 4040,
        g.CloseGifAD = 4050,
        g.GifLoadResult = 4060,
        g.InitAppbox = 4070,
        g.PlayAppbox = 4080,
        g.NoAdOrShareReady = 5e3,
        g.InitBannerAD = 6e3,
        g.InitInterstitialAD = 6010,
        g.InitVideoAD = 6020,
        g.InitGifAD = 6030,
        g.ShowBannerAD = 6040,
        g.NoAppboxReady = 6050,
        g.AppendTextTip = 7e3,
        g.AppendWindows = 7010,
        g.AppendBox = 7020,
        g.CloseWindow = 7030,
        g.ShowLoading = 7040,
        g.CloseLoading = 7050,
        g.CloseBox = 7060,
        g.updateBoatLvRequest = 8e3,
        g.updateBoatUpgradeRequest = 8010,
        g.BoatLvIncrease = 8020,
        g.BoatUpgradeLvIncrease = 8030,
        g.unlockBoatUpgrade = 8040,
        g.SkillTypeValueChange = 8050,
        g.UpdateAddGold = 9e3,
        g.ReplaceSkin = 9100,
        g.ChangeSliderDesc = 9200,
        g.AddList = 9300,
        g.ChangeSpeedState = 9400,
        g.EnemyDie = 9500,
        g.SaveGameData = 9600,
        g.MainPlayerUpdate = 9700,
        g.UpdateGold = 9800,
        g.ReGame = 9900,
        g.ShopWeapon = 1e4,
        g.UpdateStoreGold = 10001,
        g.UpdateMainUITip = 10002,
        g.PauseGame = 11e3,
        g.ResumeGame = 11001,
        g.ExitGame = 11002,
        g.UpdateAddGoldSecond = 12e3,
        g.UpdatePowerLimit = 12001,
        g.InitPlayer = 12002,
        g.GameGoldAward = 12003,
        g.ChangeATKTarget = 12004,
        g.GamePausePopp = 12005,
        g.CreateEnemyClass = 12007,
        g.OnShow = 13e3,
        g.OnHide = 13001,
        g.UpdateTalentGoldSpeed = 13003,
        g.RefreshTreasure = 13005,
        g.RefreshKnaspace = 13006,
        g.ShowBossTip = 13007,
        g.AddEnemyDie = 13008,
        g.RefreshKnaspaceUI = 13009,
        g.UpdateGoldMain = 13010,
        g.AddEff = 14e3,
        g.ShowEff = 14001,
        g.HideEff = 14002,
        g.ShowGoldEff = 14003,
        g.GetTreasure = 14004,
        g.OpenTreasuere = 14005,
        g.SkillEff = 14006,
        g.DoubleResult = 14007,
        g.SafeResult = 14008,
        g.RefectionResult = 14009,
        g.GiftResult = 14010,
        g.GoldResult = 14011,
        g.OverResult = 14012,
        g.OffLineResult = 14013,
        g.SignResult = 14014,
        g.UpdateSharePower = 14015,
        g.SkillUpResult = 14016,
        g.UpdateSkillButtn = 14017,
        g.UpdateGoldAward = 15014,
        g.ButtonCounnt = 16e3,
        g.HPFullState = 16001,
        g.WeaponLevelUpResult = 16002,
        g.SafeBoxGameResume = 17002,
        g.SafeBoxShow = 17003,
        g.ReSafeBoxCreate = 17004,
        g.HideSafeBox = 17005,
        g.LoadMainUI = 17006,
        g.ChangePlayerAtkTarget = 18e3,
        g.BossWeaknessDead = 19e3,
        g.AtkSpecialBoss = 19001,
        g.BossHpBar = 19002,
        g.ShootAnim = 19003,
        g.StopGame = 20004;
    class _ {
        static AddListener(e, t, s) {
            null == _.data && (_.data = {});
            let i = _.data[e];
            if (null == i)
                return i = new Array, _.data[e] = i, i.push(new f(t, s)), !0; {
                let e = -1;
                for (let a = 0; a < i.length; ++a) {
                    let n = i[a];
                    if (null == n || null == n)
                        e = a;
                    else if (n.caller == t && n.callBack == s)
                        return !1
                }
                return -1 == e ? i.push(new f(t, s)) : i[e] = new f(t, s),
                    !0
            }
        }
        static RemoveListener(e, t, s) {
            if (null == _.data)
                return;
            let i = _.data[e];
            if (null != i)
                for (let a = 0; a < i.length; ++a) {
                    let n = i[a];
                    if (null != n && (n.caller == t && n.callBack == s))
                        return n.caller = null, n.callBack = null, n = null, void(_.data[e][a] = null)
                }
        }
        static Dispatch(e, ...t) {
            if (null != _.data) {
                let s = _.data[e];
                if (null != s && s.length > 0)
                    for (let e = 0, i = s.length; e < i; ++e)
                        null != s[e] && s[e].execute(t)
            }
        }
    }
    _.data = void 0;
    class f {
        constructor(e, t) {
            this.caller = e,
                this.callBack = t
        }
        execute(e) {
            this.callBack.call(this.caller, e)
        }
    }
    class y extends Laya.Script {
        constructor() {
            super(...arguments),
                this.needRecover = !1,
                this.shootInterval = 0,
                this.flag = !0
        }
        onAwake() {
            this.shoot_speed = [],
                this.humanSp = this.owner,
                this.name = this.owner.name,
                this.shootInterval = m.Instance.getPlayerShootTimer()
        }
        getSite() {
            return {
                x: this.humanSp.x,
                y: this.humanSp.y - 65
            }
        }
        subHp(e, t = 0) {
            this.isDie || (this.hp -= e, this.hurt(e, t), this.hurtEff(), this.hp <= 0 && this.die())
        }
        addHp(e) {
            this.hp += e,
            this.hp > this.fullHp && (this.hp = this.fullHp)
        }
        addHurtIcon() {}
        die() {
            this.isDie = !0,
            this.autoFire && this.owner.off(Laya.Event.CLICK, this, this.touchAtkSelf),
            this.icon && this.icon.removeSelf(),
            this.sk_func && this.sk_func.removeSelf(),
            this.fingerSK && (this.fingerSK.removeSelf(), this.fingerSK.destroy(!0), this.fingerSK = null),
            this.fireSK && (this.fireSK.removeSelf(), m.Instance.cycleSkeleton("mult_gold_3", this.fireSK));
            let e = Math.floor(4 * Math.random() + 1);
            o.playSceneSound("enemy_" + e),
                Laya.timer.clear(this, this.updateAtkHuman)
        }
        init(e, t, s, i, a, o, h, r = !1) {
            if (this.fullHp = e, this.hp = e, this.atk = t, n.l("自定义的速度: ", this.shoot_speed), this.shoot_speed || (this.shoot_speed = []), s)
                for (let e = 0; e < s.length; e++) {
                    const t = s[e];
                    n.l("element : " + t),
                        this.shoot_speed[e] = t
                }
            this.defend = i,
                this.isShoot = !1,
                this.weaponType = a,
                this.isDie = !1,
                this.resetInfo(),
                this.initSelfSk(),
                this.loopMethod(),
                this.autoFire = o,
                this.humanSp.size(138, 211),
                this.humanType = h,
                this.needRecover = r,
            this.autoFire && this.owner.on(Laya.Event.CLICK, this, this.touchAtkSelf)
        }
        resetInfo() {}
        initSelfSk() {}
        loopMethod() {}
        atkTarget(e) {
            Laya.timer.clear(this, this.shootLoop),
                Laya.timer.clear(this, this.updateAtkHuman),
                this.atkHuman = e,
                Laya.timer.loop(this.shoot_speed[3], this, this.shootLoop)
        }
        shootLoop() {
            this.currShootCount = this.shoot_speed[1],
                this.updateAtkHuman();
            m.Instance.getPlayerShootTimer();
            Laya.timer.loop(this.shootInterval, this, this.updateAtkHuman)
        }
        shootStop() {}
        updateAtkHuman() {
            if (0 == this.currShootCount)
                return this.shootStop(), void Laya.timer.clear(this, this.updateAtkHuman);
            if (this.isDie || null === this.atkHuman || void 0 === this.atkHuman)
                Laya.timer.clear(this, this.shootLoop), Laya.timer.clear(this, this.updateAtkHuman);
            else {
                if (this.atkHuman.hasDie())
                    return Laya.timer.clear(this, this.shootLoop), Laya.timer.clear(this, this.updateAtkHuman), void(this.atkHuman = null);
                this.shoot(),
                    this.currShootCount--
            }
        }
        shoot() {
            Le.Instance.go_over || this.isDie || (this.shootAnim(), this.atkEnemy())
        }
        atkEnemy() {
            null !== this.atkHuman && null !== this.atkHuman && this.atkHuman.subHp(this.atk)
        }
        shootAnim() {
            o.playGunSound(s.gun_types[this.gun_type - 1])
        }
        hurt(e, t) {}
        hurtEff() {}
        hasDie() {
            return this.isDie
        }
        getAtkDistance(e = 0) {
            return this.shoot_speed ? this.shoot_speed[0] + e : 0
        }
        hasAtkHuman() {
            return null !== this.atkHuman && void 0 !== this.atkHuman
        }
        getAtkHuman() {
            return this.atkHuman
        }
        collider(e) {
            let t = this.getRect(),
                s = t.x,
                i = t.y,
                a = t.width,
                n = t.height;
            return (s >= e.x && s <= e.x + e.width || s <= e.x && s + a >= e.x) && (i >= e.y && i <= e.y + e.height || i <= e.y && i + n >= e.y)
        }
        getRect() {
            let e = {};
            return e.x = this.humanSp.x - this.humanSp.pivotX,
                e.y = this.humanSp.y - this.humanSp.pivotY,
                e.width = 70,
                e.height = 150,
                e
        }
        clearTimer() {
            Laya.timer.clearAll(this)
        }
        touchAtkSelf() {
            this.flag && (this.flag = !1, _.Dispatch(g.ChangePlayerAtkTarget, this), Laya.timer.once(500, this, () => {
                this.flag = !0
            }))
        }
        get Atk() {
            return this.atk
        }
        get HumanClass() {
            return this.humanClass
        }
    }
    class S {
        trackObj(e, s, i, a, n, o, h) {
            let r = Math.abs(e.x - s.x) / 2,
                l = Math.abs(e.y - s.y) + h,
                p = 0,
                d = 0;
            0 == o ? (p = e.x + r, d = e.y - l) : (p = e.x - r, d = e.y - l);
            let c = Laya.Tween.to(e, {
                    x: p
                }, n, null),
                u = Laya.Tween.to(e, {
                    y: d
                }, n, Laya.Ease.cubicOut, Laya.Handler.create(this, () => {
                    let i = Laya.Tween.to(e, {
                            x: s.x
                        }, n, null),
                        o = Laya.Tween.to(e, {
                            y: s.y
                        }, n, Laya.Ease.cubicIn, Laya.Handler.create(this, () => {
                            X.Instance.removeTween(i),
                                X.Instance.removeTween(o),
                                t.cycleObject("", this, 1),
                                a()
                        }));
                    X.Instance.removeTween(c),
                        X.Instance.removeTween(u),
                        X.Instance.pushTween(i),
                        X.Instance.pushTween(o)
                }));
            X.Instance.pushTween(c),
                X.Instance.pushTween(u)
        }
    }
    class b {
        static bombTrack(e, t, s, i, a = 200, n = 0, o = 150) {
            Laya.Pool.createByClass(S).trackObj(e, t, s, i, a, n, o)
        }
    }
    class I {
        static createNumberHurt(e, t, s, i, a, n = 0) {
            Laya.Pool.createByClass(I).showHurt(e, t, s, i, a, n)
        }
        showHurt(e, s, i, a, n, o) {
            let h = Laya.Pool.createByClass(Laya.Image),
                r = [];
            h.skin = "";
            for (let e = 0; e < s.length; e++) {
                const t = s[e];
                let a = Laya.Pool.createByClass(Laya.Image);
                a.skin = I.NUM_PATH[i] + t + ".png",
                    a.x = 36 * e,
                    a.rotation = 0,
                    a.y = 0,
                    h.addChild(a),
                    r.push(a)
            }
            e.addChild(h),
                h.pos(a, n),
                h.scaleX = .7,
                h.scaleY = .7,
                h.rotation = 25;
            let l = {},
                p = 200 * Math.random();
            0 == o ? (l.x = a + 50 + p, l.y = n - 50) : (l.x = a - 50 - p, l.y = n - 50);
            let d = 100 * Math.random();
            Laya.Tween.to(h, {
                scaleX: 1,
                scaleY: 1
            }, 250);
            let c = this;
            b.bombTrack(h, l, 200, () => {}, 300, o, d),
                Laya.timer.once(600, this, () => {
                    for (let e = 0; e < r.length; e++) {
                        const s = r[e];
                        t.cycleObject("", c, 1),
                            s.removeSelf()
                    }
                    t.cycleObject("", c, 1),
                        h.removeSelf(),
                        t.cycleObject("", c, 1)
                })
        }
        static showNum(e, t, s, i, a) {
            let n = new Laya.Image,
                o = [];
            for (let e = 0; e < t.length; e++) {
                const i = t[e];
                let a = new Laya.Image;
                a.skin = this.NUM_PATH[s] + i + ".png",
                    a.x = 46 * e,
                    n.addChild(a),
                    o.push(a)
            }
            e.addChild(n),
                n.pos(i, a),
                n.scaleX = .7,
                n.scaleY = .7
        }
    }
    I.NUM_PATH = ["damage_number/damage_num_", "damage_number/damagered_num_"],
        function (e) {
            e.DropConfig = class {
                constructor(e, t, s, i, a, n, o) {
                    this.Drop_ID = e,
                        this.Drop_Group = t,
                        this.Drop_LimitLv = s,
                        this.DropItem_Type = i,
                        this.Item_ID = a,
                        this.Drop_Num = n,
                        this.Drop_Weight = o
                }
            };
            e.EquipDropConfig = class {
                constructor(e, t, s, i, a) {
                    this.EDrop_ID = e,
                        this.Equip_Group = t,
                        this.EquipItem_Type = s,
                        this.Drop_Num = i,
                        this.Drop_Weight = a
                }
            };
            e.ItemConfig = class {
                constructor(e, t, s, i, a, n, o, h, r, l, p, d, c, u) {
                    this.Item_ID = e,
                        this.Item_Sprite = t,
                        this.Item_Type = s,
                        this.Item_Name = i,
                        this.Item_Cost = a,
                        this.ItemCost_GrowUp = n / 1e4,
                        this.Item_Spend = o,
                        this.Item_attri = h,
                        this.Item_Parameter = r,
                        this.Item_Intro = l,
                        this.Item_BGColor = p,
                        this.Gun_Type = d,
                        this.Award = c,
                        this.Item_NameEN = u
                }
            };
            e.LevelCustem = class {
                constructor(e, t, s, i, a, n, o, h, r, l, p, d, c, u, m, g, _, f, y, S, b, I) {
                    this.Level_ID = e,
                        this.Level_Type = t,
                        this.Scene_ID = s,
                        this.Attributes_Growth = i,
                        this.Level_RewardDrop = a,
                        this.Level_GoldAward = n,
                        this.Base_Injury = o,
                        this.Base_HP = h,
                        this.Injury_GrowthRate = r,
                        this.EquipDrop_MGroupNum1 = l,
                        this.EquipDrop_MGroupGrade1 = p,
                        this.EquipDrop_MGroupNum2 = d,
                        this.EquipDrop_MGroupGrade2 = c,
                        this.Level_TotalGains = u,
                        this.Normal_HP = m,
                        this.Rare_HP = g,
                        this.Boss_HP = _,
                        this.Normal_dam = f,
                        this.Rare_dam = y,
                        this.Boss_dam = S,
                        this.Oil_dam = b,
                        this.Boss_pre = I
                }
            };
            e.Login = class {
                constructor(e, t, s, i) {
                    this.Login_Day = e,
                        this.Login_Award = t,
                        this.Login_Mult = s,
                        this.Login_AType = i
                }
            };
            e.MonsterConfig = class {
                constructor(e, t, s, i, a, n, o, h, r, l, p, d) {
                    this.Monster_ID = e,
                        this.Monster_Sprite = t,
                        this.Monster_cloth = s,
                        this.Monster_Helmet = i,
                        this.Monster_Gun = a,
                        this.Drop_Group = n,
                        this.Monster_GunParameter = l,
                        this.Monster_Type = p,
                        this.Monster_Class = d
                }
            };
            e.ShareCount = class {
                constructor(e, t, s) {
                    this.ID = e,
                        this.Share_Count = t,
                        this.Count_SR = s
                }
            };
            e.GlobalConfig = class {
                constructor(e, t, s, i, a, n, o, h, r, l, p, d, c, u, m, g, _, f, y, S, b, I, w, L, v, C, T, k, x, B, E, A, D, R, G, P, M, N, O, U, F, H, K, j, W, V, Y, q, X, Q, z, J, Z) {
                    this.Version = e,
                        this.ShareGlobal_Check = t,
                        this.ReturnTime_Fixed = s,
                        this.IntersitialFresh_Time = i,
                        this.Banner_MisGuide = a,
                        this.BannerFresh_Time = n,
                        this.sharepicture_url = o,
                        this.sharepicture_num = h,
                        this.sharepicture_title = r,
                        this.BuyRank_Max = l,
                        this.BuyRank_Min = p,
                        this.SBoxRank_Max = u,
                        this.SBoxRank_Min = m,
                        this.Monster_GoldNum = g,
                        this.SafeBox_FreeNum = _,
                        this.SafeBox_VideoNum = f,
                        this.SafeBox_ShareNum = y,
                        this.DailyData_ResetTime = S,
                        this.Injury_BasicValue = b,
                        this.Injury_GrowthRate = I,
                        this.MoveSpeed = w,
                        this.SafeBox_GoldK = L,
                        this.Gold_add = v,
                        this.straightup_probability = C,
                        this.straightup_level = k,
                        this.SafeBox_Global = x,
                        this.SafeBox_InTime = B,
                        this.bannerWidthPercentage = T,
                        this.SafeBox_Trigger = E,
                        this.MainBanner_FreshTime = A,
                        this.FightBanner_FreshTime = D,
                        this.SEBanner_FreshTime = R,
                        this.Madness_Chance = G,
                        this.Madness_DPSUp = P,
                        this.Madness_AKTime = M,
                        this.Madness_HPReduce = N,
                        this.InjuryK_Fly = O,
                        this.Extract_Fly = U,
                        this.FlyMan_BombTime = F,
                        this.InjuryK_DeadMan = H,
                        this.Extract_DeadMan = K,
                        this.BossSK_BlasterTime = j,
                        this.BossSK_RebelTime = W,
                        this.BossSK_RebelNum = V,
                        this.BossSK_RugTime = Y,
                        this.BossSK_RugHP = q,
                        this.BossSK_BunkerTime = X,
                        this.BossSK_LancerHP = Q,
                        this.boss_HPSum = z,
                        this.Oildam_Range = J,
                        this.mistake_banner = Z
                }
            };
            e.TalentConfig = class {
                constructor(e, t, s) {
                    this.Talent_Type = e,
                        this.Talent_Value = t,
                        this.Talent_Upgrade = s
                }
            };
            let t,
                s,
                i,
                a;
            e.FunctionConfig = class {
                constructor(e, t, s, i, a, n) {
                    this.ID = e,
                        this.Function_Name = t,
                        this.Function_Parameters = s,
                        this.Is_loop = i,
                        this.Count = a,
                        this.Daily_Reset = n
                }
            },
                function (e) {
                    e[e.DOUBLE_INCOME = 0] = "DOUBLE_INCOME",
                        e[e.SAFEBOX = 1] = "SAFEBOX",
                        e[e.REFECTION = 2] = "REFECTION",
                        e[e.GIFT = 3] = "GIFT",
                        e[e.GOLD = 4] = "GOLD",
                        e[e.QIANDAO = 5] = "QIANDAO",
                        e[e.JIESUAN = 6] = "JIESUAN",
                        e[e.OFFINLE_INCOME = 7] = "OFFINLE_INCOME",
                        e[e.SKILL_UP = 8] = "SKILL_UP",
                        e[e.STRAIGHT_UP = 9] = "STRAIGHT_UP"
                }
                (t = e.ShareConfig || (e.ShareConfig = {})),
                function (e) {
                    e[e.OIL_DAM = 0] = "OIL_DAM",
                        e[e.BOMB_SELF = 1] = "BOMB_SELF",
                        e[e.FLY_MAN = 2] = "FLY_MAN",
                        e[e.RUG_BOSS = 3] = "RUG_BOSS"
                }
                (s = e.FirstPlayer || (e.FirstPlayer = {})),
                function (e) {
                    e[e.OFF_LINE_COMMON_BTN = 0] = "OFF_LINE_COMMON_BTN",
                        e[e.OFF_LINE_SUPER_BTN = 1] = "OFF_LINE_SUPER_BTN",
                        e[e.POWER_GET_BTN = 2] = "POWER_GET_BTN",
                        e[e.POWER_CLOSE_BTN = 3] = "POWER_CLOSE_BTN",
                        e[e.KNASPACE_RECOVER_BTN = 4] = "KNASPACE_RECOVER_BTN",
                        e[e.KNASPACE_WEAPON_SHOP_BTN = 5] = "KNASPACE_WEAPON_SHOP_BTN",
                        e[e.KNASPACE_HELMET_SHOP_BTN = 6] = "KNASPACE_HELMET_SHOP_BTN",
                        e[e.KNASPACE_CLOTH_SHOP_BTN = 7] = "KNASPACE_CLOTH_SHOP_BTN",
                        e[e.TREASURE_GET_BTN = 8] = "TREASURE_GET_BTN",
                        e[e.TREASURE_CLOSE_BTN = 9] = "TREASURE_CLOSE_BTN",
                        e[e.SIGN_COMMON_BTN = 10] = "SIGN_COMMON_BTN",
                        e[e.SIGN_SUPER_BTN = 11] = "SIGN_SUPER_BTN",
                        e[e.GOLD_SPEED_BTN = 12] = "GOLD_SPEED_BTN",
                        e[e.GOLD_SPEDD_CLOSE_BTN = 13] = "GOLD_SPEDD_CLOSE_BTN",
                        e[e.RESULT_NEXT_BTN = 14] = "RESULT_NEXT_BTN",
                        e[e.RESULT_BACK_BTN = 15] = "RESULT_BACK_BTN",
                        e[e.RESULT_HEALP_BTN = 16] = "RESULT_HEALP_BTN",
                        e[e.SHARE_GOLD_BTN = 17] = "SHARE_GOLD_BTN",
                        e[e.SHARE_GOLD_CLOSE_BTN = 18] = "SHARE_GOLD_CLOSE_BTN",
                        e[e.GUN_COMPLEX = 19] = "GUN_COMPLEX",
                        e[e.HELMET_COMPLEX = 20] = "HELMET_COMPLEX",
                        e[e.CLOTH_COMPLEX = 21] = "CLOTH_COMPLEX",
                        e[e.STRAIGHT_LEVEL_UP = 22] = "STRAIGHT_LEVEL_UP"
                }
                (i = e.GameButtonName || (e.GameButtonName = {})),
                function (e) {
                    e[e.COMMON_ENEMY = 0] = "COMMON_ENEMY",
                        e[e.BOMB_SELF_ENEMY = 1] = "BOMB_SELF_ENEMY",
                        e[e.FLY_MAN_ENEMY = 2] = "FLY_MAN_ENEMY"
                }
                (a = e.SpecialEnemy || (e.SpecialEnemy = {}))
        }
        (c || (c = {}));
    var w = c.ItemConfig,
        L = c.Login,
        v = c.TalentConfig;
    class C {
        parseItemConfig(t) {
            let s = t.ItemConfig;
            this.itemConfigInfo = [],
                this.itemConfigInfo[0] = [],
                this.itemConfigInfo[1] = [],
                this.itemConfigInfo[2] = [],
                this.itemConfigInfo[3] = [];
            for (let e = 0; e < s.length; e++) {
                const t = s[e];
                let i = parseInt(t.Item_ID),
                    a = t.Item_Sprite,
                    n = parseInt(t.Item_Type),
                    o = t.Item_Name,
                    h = parseInt(t.Item_Cost),
                    r = parseInt(t.ItemCost_GrowUp),
                    l = parseInt(t.Item_Spend),
                    p = parseInt(t.Item_attri),
                    d = parseInt(t.Item_BGColor),
                    c = parseInt(t.Gun_Type),
                    u = parseInt(t.Award),
                    m = t.Item_Parameter.split("_").map(e => parseInt(e)),
                    g = t.Item_Intro,
                    _ = t.Item_NameEN,
                    f = new w(i, a, n, o, h, r, l, p, m, g, d, c, u, _);
                n - 1 < 4 && this.itemConfigInfo[n - 1].push(f)
            }
            e.l("装备的属性 : ", this.itemConfigInfo)
        }
        parseTalentConfig(e) {
            let t = e.TalentConfig;
            this.talentConfigInfo = [],
                this.talentConfigInfo[0] = [],
                this.talentConfigInfo[1] = [],
                this.talentConfigInfo[2] = [],
                this.talentConfigInfo[3] = [],
                this.talentConfigInfo[4] = [];
            for (let e = 0; e < t.length; e++) {
                const s = t[e];
                let i = parseInt(s.Talent_Type),
                    a = parseFloat(s.Talent_Value),
                    n = parseInt(s.Talent_Upgrade),
                    o = new v(i, a, n);
                this.talentConfigInfo[i - 1].push(o)
            }
        }
        getTalentConfig() {
            return this.talentConfigInfo
        }
        parsePropConfig(e) {
            this.propConfigInfo = [],
                this.propConfigInfo[0] = [],
                this.propConfigInfo[1] = [],
                this.propConfigInfo[2] = [],
                this.propConfigInfo[3] = [],
                this.propConfigInfo[4] = [];
            let t = e.SkillConfig;
            for (let e = 0; e < t.length; e++) {
                const s = t[e];
                let i = [],
                    a = parseInt(s.Enhanced_Level),
                    n = s.Knives_Sprite,
                    o = parseInt(s.Knives_Limite),
                    h = parseInt(s.Knives_Num),
                    r = parseInt(s.Knives_Dam),
                    l = parseInt(s.Knives_Cost);
                i.push(a, n, o, h, r, l),
                    this.propConfigInfo[0].push(i),
                    i = [];
                let p = s.Dog_Sprite,
                    d = parseInt(s.Dog_Limite),
                    c = parseInt(s.Dog_Num),
                    u = parseInt(s.Dog_Dam),
                    m = parseInt(s.Dog_Cost),
                    g = parseInt(s.Dog_Duration);
                i.push(a, p, d, c, u, m, g),
                    this.propConfigInfo[1].push(i),
                    i = [];
                let _ = s.Grenade_Sprite,
                    f = parseInt(s.Grenade_Limite),
                    y = parseInt(s.Grenade_Num),
                    S = parseInt(s.Grenade_Dam),
                    b = parseInt(s.Grenade_Cost),
                    I = parseInt(s.Grenade_Radius);
                i.push(a, _, f, y, S, b, I),
                    this.propConfigInfo[2].push(i),
                    i = [];
                let w = s.Rocket_Sprite,
                    L = parseInt(s.Rocket_Limite),
                    v = parseInt(s.Rocket_Num),
                    C = parseInt(s.Rocket_Dam),
                    T = parseInt(s.Rocket_Cost);
                i.push(a, w, L, v, C, T),
                    this.propConfigInfo[3].push(i),
                    i = [];
                let k = s.Medical_Sprite,
                    x = parseInt(s.Medical_Limite),
                    B = parseInt(s.Medical_Num),
                    E = parseInt(s.Medical_Recovery),
                    A = parseInt(s.Medical_Cost);
                i.push(a, k, x, B, E, A),
                    this.propConfigInfo[4].push(i)
            }
        }
        parseLoginConfig(e) {
            let t = e.LoginConfig;
            this.loginInfo = new Array;
            for (let e = 0; e < t.length; e++) {
                const s = t[e];
                let i = parseInt(s.Login_Day),
                    a = parseInt(s.Login_Award),
                    n = parseInt(s.Login_Mult),
                    o = parseInt(s.Login_AType),
                    h = new L(i, a, n, o);
                this.loginInfo.push(h)
            }
        }
        getLoginConfig(e) {
            return [this.loginInfo[e].Login_AType, this.loginInfo[e].Login_Award]
        }
        static get Instance() {
            return null !== this.instance && void 0 !== this.instance || (this.instance = new C),
                this.instance
        }
        getItemConfig() {
            return this.itemConfigInfo
        }
        getSkillConfig() {
            return this.propConfigInfo
        }
    }
    class T {
        static get Instance() {
            return null != this.instance && null != this.instance || (this.instance = new T, _.AddListener(g.UpdateAddGold, this, e => {})),
                this.instance
        }
        init() {}
    }
    T.loadSceneIndex = 0,
        T.super_add_time = 0,
        T.gold_up_speed_time = 0;
    class k {
        constructor() {
            this.focus_change_game_on = !0,
                this.add_speed_flag = !1,
                this.hasMainPage = !0,
                this.play_gun_sound = !0,
                this.goldSpeedMul = 1,
                this.power_recover_timer = 0,
                this.power_limit = 0,
                this.power_recover_all_time = 1800,
                Laya.timer.loop(6e4, this, this.saveOffLineData),
                this.updateGoldValue(),
                this.addSharedListener(),
                _.AddListener(g.UpdateGoldAward, this, this.updateGoldValue)
        }
        static get Instance() {
            return null != this.instance && null != this.instance || (this.instance = new k),
                this.instance
        }
        set MainUIManager(e) {
            this.mainUIManager = e
        }
        updateGoldValue() {
            this.gold_value = this.getGoldAwardNum()
        }
        addGoldEarning() {
            let e = this.gold_award_arr;
            return e.length > 30 ? e[30] += this.gold_value : this.gold_award_arr.push(this.gold_value),
            this.gold_award_arr.length > 30
        }
        getAllGoldAward() {
            let e = this.gold_award_arr.reduce((e, t) => e + t);
            X.Instance.gold += e,
                this.gold_award_arr = []
        }
        powerRecover(e = !0) {
            let t = 0;
            return e && (this.power_recover_timer++, t = this.power_recover_timer / this.power_recover_all_time, this.power_recover_timer >= this.power_recover_all_time && (this.power_recover_timer = 0, B.Instance.power_info[1]++, B.Instance.savePowerValue())),
                t
        }
        judgePowerRecoverTimeSuccess() {
            return this.power_recover_timer >= this.power_recover_all_time
        }
        addSharedListener() {
            _.AddListener(g.ShareResult, this, this.shareResultManager),
                _.AddListener(g.VideoADResult, this, this.videoResultManager),
                _.AddListener(g.AppendBox, this, this.playPoppBanner)
        }
        playPoppBanner() {
            _.Dispatch(g.ShowBannerAD, 0)
        }
        videoResultManager(e) {
            e[1] ? (_.Dispatch(g.AppendTextTip, "天赋 +1 ", 2e3), B.Instance.talent_point++, B.Instance.saveTalentPointValue()) : _.Dispatch(g.AppendTextTip, "视频已关闭！", 1e3),
                this.resultEvent(e)
        }
        shareResultManager(e) {
            e[1] ? _.Dispatch(g.AppendTextTip, "分享成功咯!", 2e3) : _.Dispatch(g.AppendTextTip, "分享太过频繁，请稍后再试！", 1e3),
                this.resultEvent(e)
        }
        resultEvent(e) {
            switch (e[0]) {
                case "Qiandao":
                    _.Dispatch(g.SignResult, e[1]);
                    break;
                case "Double_income":
                    _.Dispatch(g.DoubleResult, e[1]);
                    break;
                case "SafeBox":
                    _.Dispatch(g.SafeResult, e[1]);
                    break;
                case "Refection":
                    _.Dispatch(g.RefectionResult, e[1]);
                    break;
                case "Gift":
                    _.Dispatch(g.GiftResult, e[1]);
                    break;
                case "Gold":
                    _.Dispatch(g.GoldResult, e[1]);
                    break;
                case "Jiesuan":
                    _.Dispatch(g.OverResult, e[1]);
                    break;
                case "Offinle_income":
                    _.Dispatch(g.OffLineResult, e[1]);
                    break;
                case "skill_up":
                    _.Dispatch(g.SkillUpResult, e[1]);
                    break;
                case "StraightUp":
                    _.Dispatch(g.WeaponLevelUpResult, e[1])
            }
        }
        saveOffLineData() {
            this.add_speed_flag && this.hasMainPage && B.Instance.saveAddSpeed(),
                B.Instance.saveOffLineTime(),
                this.subscriptionUpdate()
        }
        subscriptionUpdate() {}
        onGameShow() {
            B.Instance.getOffLineTime(),
            Math.floor(B.Instance.off_line_time / 60) >= 5 && _.Dispatch(g.AppendBox, "prefabs/Popp/OffLinePopp.json")
        }
        shootSpeed(e, t) {
            this.clearTimeSelf();
            let s = C.Instance.getItemConfig()[0][e];
            this.param = s.Item_Parameter,
                this.count = this.param[1],
                this.shoot_anim_timer = m.Instance.getPlayerShootTimer(),
                this.callBack = t;
            let i = B.Instance.getMaxWeapon()()[0];
            this.gun_type = C.Instance.getItemConfig()[0][i - 1].Gun_Type;
            let a = this.param[3];
            this.add_speed_flag && (a = this.param[3] / 2),
                Laya.timer.loop(a, this, this.shootStart)
        }
        shoot() {
            this.count--,
            this.play_gun_sound && o.playGunSound(s.gun_types[this.gun_type - 1]),
                this.callBack(),
            0 == this.count && Laya.timer.clear(this, this.shoot)
        }
        shootStart() {
            this.count = this.param[1],
                Laya.timer.loop(this.shoot_anim_timer, this, this.shoot)
        }
        judageTalentLevel() {
            if (B.Instance.talent_point > 0) {
                for (let e = 0; e < B.Instance.talents.length; e++) {
                    if (B.Instance.talents[e] < 5)
                        return !0
                }
                return !1
            }
            return !1
        }
        getGoldAwardNum() {
            let e = X.Instance.getLevelEarnings();
            this.add_speed_flag && (this.goldSpeedMul = C.Instance.getTalentConfig()[2][B.Instance.talents[2]].Talent_Value, e = e * this.goldSpeedMul / 2);
            let t = B.Instance.getMaxWeapon()()[0],
                s = C.Instance.getItemConfig()[0][t - 1].Item_Parameter;
            return e = (e = Math.ceil(60 * e / (6e4 / s[3] * s[1]))) <= 0 ? 1 : e
        }
        clearTimeSelf() {
            Laya.timer.clear(this, this.shootStart),
                Laya.timer.clear(this, this.shoot)
        }
        judgePowerLimit() {
            return B.Instance.power_info[1] < this.power_limit
        }
        powerRecoverCount() {
            this.power_recover_timer = 0;
            let e = Date.now() / 1e3;
            if (this.power_recover_timer = e - B.Instance.power_info[0], this.power_limit = C.Instance.getTalentConfig()[4][B.Instance.talents[4]].Talent_Value, this.judgePowerLimit()) {
                let e = Math.floor(this.power_recover_timer / this.power_recover_all_time);
                e > 0 && (e = B.Instance.power_info[1] + e, B.Instance.power_info[1] = e > this.power_limit ? this.power_limit : e),
                    this.power_recover_timer %= this.power_recover_all_time
            }
            if (B.Instance.power_info[1] >= this.power_limit && (this.power_recover_timer = 0), B.Instance.add_gold_speed_time[0] > 0) {
                B.Instance.add_gold_speed_time,
                    X.Instance.getAddGoldSpeedInfo()[0];
                T.super_add_time = B.Instance.add_gold_speed_time[0];
                T.super_add_time;
                T.gold_up_speed_time = T.super_add_time,
                    this.goldSpeedMul = C.Instance.getTalentConfig()[2][B.Instance.talents[2]].Talent_Value,
                    this.add_speed_flag = !0,
                    this.mainUIManager.changeGoldSpeedMul()
            } else
                this.mainUIManager.judgeAddGoldSpeed();
            B.Instance.savePowerValue(this.power_recover_timer)
        }
    }
    k.initSafeBoxManager = !1;
    class x {
        constructor() {
            this.tempIDs = ["b79c6lGegV3v1DJtcNrReSToHUWuGvZBdoe1w7X9URs", "OM2PXkJBwznEyhVJuMdhObPL-LdT47F1N5PFEYXbgH0"],
                this.cloudCallFuncName = "basedata",
                this.subTipFlag = !0
        }
        static get Instance() {
            return null != this.instance && null != this.instance || (this.instance = new x),
                this.instance
        }
        initTemp(e) {
            this.subTipFlag ? (this.subTipFlag = !1, e && (this.tempIDs = e), this.onSubscribe()) : console.warn("当天已经提醒过了，不需要在弹出打扰了--------------")
        }
        saveBaseData(e, t, s) {
            this.wx || (this.wx = Laya.Browser.window.wx),
            this.wx && "function" == typeof this.wx.cloud.init && (this.wx.cloud.init("rush2_slx"), this.wx.cloud.callFunction({
                name: this.cloudCallFuncName,
                data: {
                    templateIds: this.tempIDs,
                    data: {
                        thing1: {
                            DATA: "可能存在收益了哦"
                        },
                        data2: {
                            DATA: "当前时间"
                        }
                    },
                    power: s,
                    power_time: e,
                    offline_time: t
                }
            }))
        }
        onSubscribe() {
            let e = Laya.Browser.window.wx;
            if (this.wx = Laya.Browser.window.wx, !e || "function" != typeof e.requestSubscribeMessage)
                return;
            e.cloud.init("rush2_slx");
            let t = this.tempIDs,
                s = this.cloudCallFuncName;
            e.requestSubscribeMessage({
                tmplIds: this.tempIDs,
                success(i) {
                    "requestSubscribeMessage:ok" === i.errMsg && e.cloud.callFunction({
                        name: s,
                        data: {
                            templateIds: t,
                            data: {
                                thing1: {
                                    DATA: "收益上限，可以领取了"
                                },
                                data2: {
                                    DATA: "当前时间"
                                }
                            },
                            power: 24,
                            power_time: 2,
                            offline_time: 2
                        }
                    }).then(() => {
                        B.Instance.subscriptionFlag = !0,
                            B.Instance.saveSubscriptionInfo()
                    }).catch(() => {})
                }
            }),
                console.error("获取订阅权限 ----------------------\x3e")
        }
    }
    class B {
        constructor() {
            this.knaspaceArray = [],
                this.knaspaceStr = "knaspace",
                this.propStr = "prop",
                this.goldStr = "gold",
                this.levelStr = "level",
                this.treasureStr = "treasure",
                this.weaponCountStr = "weapon_count",
                this.dayCountStr = "day_count",
                this.talentStr = "talent",
                this.talentPointStr = "talent_point",
                this.edascStr = "every_day_add_speed_count",
                this.powerStr = "power",
                this.offLineStr = "off_line",
                this.addSpeedStr = "add_speed_time",
                this.videoBtnCountStr = "video_btn_count",
                this.goldAwardCountStr = "gold_award_count",
                this.treasureFullStr = "treasure_full_weapon",
                this.currDayStr = "curr_day",
                this.versionStr = "version",
                this.firstPlayerStr = "firstPlayer",
                this.firstPlayerType = [!1, !1, !1, !1],
                this.shared_video_btn_str = "shared_video_btn_count",
                this.shared_video_btn_count = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                this.shared_video_day_str = "shared_video_day_count",
                this.shared_video_day_count = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                this.subscriptionFlag = !1,
                this.subscripStr = "subscription",
                this.versionChange = !0
        }
        static get Instance() {
            return null !== this.instance && void 0 !== this.instance || (this.instance = new B),
                this.instance
        }
        initVersion() {
            let e = Laya.LocalStorage.getItem(this.versionStr),
                t = X.Instance.getGlobalConfigInfo().Version;
            "" == e || void 0 === e || "undefined" === e || null === e ? this.versionChange = !0 : t == JSON.parse(e) && (this.versionChange = !1),
                Laya.LocalStorage.setItem(this.versionStr, JSON.stringify(t))
        }
        init() {
            _.AddListener(g.SaveGameData, this, this.saveGameData),
                this.initPropArray(),
                this.initKnaspaceArray(),
                this.initGameData(),
                this.savePropArray(),
                this.getTalentInfo(),
                this.getTalentPointValue(),
                this.getEdascValue(),
                this.getPowerValue(),
                this.initAddSpeed(),
                this.initGoldAwardCount(),
                this.initTreasureFull(),
                this.initShardInfo(),
                this.initSubscriptionInfo(),
                this.initShardDayInfo(),
                this.initVersion(),
                this.initFirstPlayer()
        }
        initFirstPlayer() {
            let e = Laya.LocalStorage.getItem(this.firstPlayerStr);
            "" == e || null == e || (this.firstPlayerType = JSON.parse(e))
        }
        saveFirstPlayer() {
            Laya.LocalStorage.setItem(this.firstPlayerStr, JSON.stringify(this.firstPlayerType))
        }
        initSubscriptionInfo() {
            let e = Laya.LocalStorage.getItem(this.subscripStr);
            "" == e || null == e || (this.subscriptionFlag = JSON.parse(e))
        }
        saveSubscriptionInfo() {
            Laya.LocalStorage.setItem(this.subscripStr, JSON.stringify(this.subscriptionFlag))
        }
        getButtonType(e) {
            let t = X.Instance.getFunctionConfigInfo()[e],
                s = this.shared_video_day_count[e],
                i = t.Function_Parameters;
            return t.Count < s && 0 == t.Is_loop ? (console.log("当前的按钮类型 -----\x3e" + i[i.length - 1][0]), i[i.length - 1][0]) : (console.log("当前的按钮类型 -----\x3e" + i[(s - 1) % i.length][0]), i[(s - 1) % i.length][0])
        }
        initShardInfo() {
            let e = Laya.LocalStorage.getItem(this.shared_video_btn_str);
            "" == e || null == e || (this.shared_video_btn_count = JSON.parse(e))
        }
        initShardDayInfo() {
            let e = Math.floor(Date.now() / 1e3 / 60 / 60 / 24),
                t = Laya.LocalStorage.getItem(this.currDayStr),
                s = Laya.LocalStorage.getItem(this.shared_video_day_str);
            if ("" != t && null != t) {
                if (e - JSON.parse(t) > 0)
                    return Laya.LocalStorage.setItem(this.currDayStr, JSON.stringify(e)), console.error("当天的分享次数时间重置"), x.Instance.subTipFlag = !0, this.subscriptionFlag ? x.Instance.saveBaseData(2, 2, 24) : console.log("当前的用户没有订阅消息"), void Laya.LocalStorage.setItem(this.currDayStr, JSON.stringify(e));
                x.Instance.subTipFlag = !1,
                "" == s || null == s || (this.shared_video_day_count = JSON.parse(s))
            } else
                Laya.LocalStorage.setItem(this.currDayStr, JSON.stringify(e))
        }
        getSharedNum(e) {
            let t = X.Instance.getFunctionConfigInfo()[e].Count - this.shared_video_day_count[e] + 1;
            return t = t < 0 ? 0 : t
        }
        judgeDaySharedCount(e) {
            let t = X.Instance.getFunctionConfigInfo()[e].Count,
                s = this.shared_video_day_count[e];
            return console.log("当前的分享次数: " + s, "当前只能分享的次数 : " + t),
            this.shared_video_day_count[e] <= t
        }
        judgeGoldSpeedBox(e) {
            return this.shared_video_day_count[e] < C.Instance.getTalentConfig()[4][B.Instance.talents[4]].Talent_Value
        }
        saveShardInfo() {
            Laya.LocalStorage.setItem(this.shared_video_btn_str, JSON.stringify(this.shared_video_btn_count)),
                Laya.LocalStorage.setItem(this.shared_video_day_str, JSON.stringify(this.shared_video_day_count)),
                console.log("保存的当前的分享信息 :  --------------------------------- > ", this.shared_video_btn_count, this.shared_video_day_count)
        }
        initTreasureFull() {
            let e = Laya.LocalStorage.getItem(this.treasureFullStr);
            this.treasureFullArr = "" == e || null == e ? [] : JSON.parse(e),
                console.log("当前剩余未领取的装备 ： ======================== >  ", this.treasureFullArr)
        }
        saveTreasureFullWeapon(e) {
            this.treasureFullArr = e,
                Laya.LocalStorage.setItem(this.treasureFullStr, JSON.stringify(this.treasureFullArr)),
                console.log("当前剩余未领取的装备 ： ======================== >  ", this.treasureFullArr)
        }
        initGoldAwardCount() {
            let e = Laya.LocalStorage.getItem(this.goldAwardCountStr);
            if ("" == e || null == e)
                k.Instance.gold_award_arr = [];
            else {
                let t = JSON.parse(e);
                k.Instance.gold_award_arr = t
            }
            console.log("当前的金币奖励 ： ======================== >  ", k.Instance.gold_award_arr)
        }
        saveGoldAwardCount() {
            Laya.LocalStorage.setItem(this.goldAwardCountStr, JSON.stringify(k.Instance.gold_award_arr))
        }
        initVideoCount() {
            let e = Laya.LocalStorage.getItem(this.videoBtnCountStr);
            if ("" == e || null == e) {
                let e = X.Instance.getFunctionConfigInfo().length;
                for (let t = 0; t < e; t++)
                    this.videoBtnCounts.push(0)
            } else
                this.videoBtnCounts = JSON.parse(e)
        }
        initAddSpeed() {
            let e = Laya.LocalStorage.getItem(this.addSpeedStr);
            this.add_gold_speed_time = "" == e || null == e ? [0, 0] : JSON.parse(e),
                console.log("剩余金币增加时间 ： " + this.add_gold_speed_time)
        }
        saveAddSpeed() {
            Laya.LocalStorage.setItem(this.addSpeedStr, JSON.stringify(this.add_gold_speed_time))
        }
        getOffLineTime() {
            let e = Laya.LocalStorage.getItem(this.offLineStr);
            if ("" == e || null == e)
                this.off_line_time = 0;
            else {
                this.off_line_time = JSON.parse(e);
                let t = Date.now() / 1e3;
                this.off_line_time = t - this.off_line_time
            }
            console.log("当前的离线时间 ： " + this.off_line_time)
        }
        saveOffLineTime() {
            let e = Date.now() / 1e3;
            Laya.LocalStorage.setItem(this.offLineStr, JSON.stringify(e))
        }
        getPowerValue() {
            let e = Laya.LocalStorage.getItem(this.powerStr),
                t = C.Instance.getTalentConfig()[4][this.talents[4]].Talent_Value;
            this.power_info = "" == e || null == e ? [0, t] : JSON.parse(e),
                console.log("当前的体力值 ： " + this.power_info)
        }
        savePowerValue(e = 0) {
            let t = 0;
            -1 == e ? (t = Date.now() / 1e3, this.power_info[0] = t) : 0 == e ? (t = Date.now() / 1e3, this.power_info[0] = t) : (t = Date.now() / 1e3, this.power_info[0] = t - e),
                Laya.LocalStorage.setItem(this.powerStr, JSON.stringify(this.power_info))
        }
        saveEdascValue() {
            let e = Date.now(),
                t = Math.floor(e / 1e3 / 60 / 60 / 24);
            this.every_day_add_speed_count[0] = t,
                Laya.LocalStorage.setItem(this.edascStr, JSON.stringify(this.every_day_add_speed_count))
        }
        getEdascValue() {
            let t = Laya.LocalStorage.getItem(this.edascStr);
            this.talents[3];
            this.every_day_add_speed_count = "" == t || null == t ? [0, 0] : JSON.parse(t);
            let s = Date.now(),
                i = Math.floor(s / 1e3 / 60 / 60 / 24) - this.every_day_add_speed_count[0];
            1 == i ? this.every_day_add_speed_count[1] = 0 : 0 == i || (this.every_day_add_speed_count[1] = 0),
                e.l,
                console.log("当天剩余的加速次数: ", this.every_day_add_speed_count)
        }
        saveKnaspceArray() {
            Laya.LocalStorage.setItem(this.knaspaceStr, JSON.stringify(this.knaspaceArray)),
                console.log("保存背包信息 ------------------------------ >", this.knaspaceArray)
        }
        saveWeaponShopCount() {
            Laya.LocalStorage.setItem(this.weaponCountStr, JSON.stringify(this.weapon_shop_count)),
                console.log("保存背包信息")
        }
        getKnaspaceArray() {
            return this.knaspaceArray
        }
        getWeaponComplex() {
            let e = [];
            return e.push(this.getComplex(0)),
                e.push(this.getComplex(1)),
                e.push(this.getComplex(2)),
                e
        }
        getComplex(e) {
            for (let t = 0; t < this.knaspaceArray[e].length; t++) {
                let s = this.knaspaceArray[e][t];
                if (0 != s)
                    for (let i = 0; i < this.knaspaceArray[e].length; i++) {
                        let a = this.knaspaceArray[e][i];
                        if (t !== i && s == a)
                            return !0
                    }
            }
            return !1
        }
        getMaxWeapon() {
            let e = [],
                t = 0,
                s = 0,
                i = 0;
            for (let e = 0; e < this.knaspaceArray[0].length; e++)
                this.knaspaceArray[0][e] > t && (t = this.knaspaceArray[0][e]), this.knaspaceArray[1][e] > s && (s = this.knaspaceArray[1][e]), this.knaspaceArray[2][e] > i && (i = this.knaspaceArray[2][e]);
            return e.push(t, s, i),
                function () {
                    return e
                }
        }
        savePropArray() {
            Laya.LocalStorage.setItem(this.propStr, JSON.stringify(X.Instance.skillsData)),
                console.log("当前的技能信息 : ", X.Instance.skillsData)
        }
        initPropArray() {
            let e = Laya.LocalStorage.getItem(this.propStr);
            X.Instance.skillsData = "" == e || null == e ? [1, 0, 0, 0, 0] : JSON.parse(e)
        }
        judgeKnaspaceEmpty(e) {
            for (let t = 0; t < this.knaspaceArray[e].length; t++) {
                if (0 == this.knaspaceArray[e][t])
                    return !0
            }
            return !1
        }
        saveGameData() {
            this.saveGameGold(),
                Laya.LocalStorage.setItem(this.levelStr, JSON.stringify(X.Instance.level)),
                Laya.LocalStorage.setItem(this.treasureStr, JSON.stringify(this.treasureCount)),
                this.saveWeaponShopCount(),
                this.saveKnaspceArray(),
                this.savePropArray(),
                this.saveGoldAwardCount()
        }
        saveGameGold() {
            Laya.LocalStorage.setItem(this.goldStr, JSON.stringify(X.Instance.gold))
        }
        saveTreasureCount() {
            Laya.LocalStorage.setItem(this.treasureStr, JSON.stringify(this.treasureCount))
        }
        initGameData() {
            let e = Laya.LocalStorage.getItem(this.goldStr),
                t = Laya.LocalStorage.getItem(this.levelStr),
                s = Laya.LocalStorage.getItem(this.treasureStr);
            this.treasureCount = "" == s || null == s ? [] : JSON.parse(s),
                X.Instance.level = "" == t || null == t ? 1 : JSON.parse(t),
                X.Instance.gold = "" == e || null == e ? 0 : JSON.parse(e),
                console.log("当前的金币：", X.Instance.gold)
        }
        setKnaspaceArray(e, t, s) {
            this.knaspaceArray[e][t] = s
        }
        initKnaspaceArray() {
            let e = Laya.LocalStorage.getItem(this.knaspaceStr),
                t = Laya.LocalStorage.getItem(this.weaponCountStr);
            "" == e || null == e ? this.initKnaspace() : this.knaspaceArray = JSON.parse(e),
                "" == t || null == t ? this.initWeaponShopCount() : this.weapon_shop_count = JSON.parse(t),
                console.log(this.knaspaceArray, this.weapon_shop_count)
        }
        initKnaspace() {
            this.knaspaceArray[0] = [],
                this.knaspaceArray[1] = [],
                this.knaspaceArray[2] = [];
            for (let e = 0; e < 12; e++)
                this.knaspaceArray[0].push(0), this.knaspaceArray[1].push(0), this.knaspaceArray[2].push(0);
            this.knaspaceArray[0][0] = 1,
                this.knaspaceArray[1][0] = 1,
                this.knaspaceArray[2][0] = 1
        }
        initWeaponShopCount() {
            this.weapon_shop_count = [],
                this.weapon_shop_count[0] = [],
                this.weapon_shop_count[1] = [],
                this.weapon_shop_count[2] = [];
            for (let e = 0; e < 20; e++)
                this.weapon_shop_count[0].push(0), this.weapon_shop_count[1].push(0), this.weapon_shop_count[2].push(0)
        }
        getTalentInfo() {
            let e = Laya.LocalStorage.getItem(this.talentStr);
            this.talents = "" == e || null == e ? [0, 0, 0, 0, 0] : JSON.parse(e),
                console.log("获取的天赋技能属性: ", this.talents)
        }
        getTalentPointValue() {
            let e = Laya.LocalStorage.getItem(this.talentPointStr);
            this.talent_point = "" == e || null == e ? 0 : JSON.parse(e),
                console.log("当前的天赋点: ", this.talent_point)
        }
        saveTalentPointValue() {
            Laya.LocalStorage.setItem(this.talentPointStr, JSON.stringify(this.talent_point))
        }
        saveTalentInfo() {
            Laya.LocalStorage.setItem(this.talentStr, JSON.stringify(this.talents)),
                this.saveTalentPointValue()
        }
        get TalentPoint() {
            return this.talent_point
        }
        set TalentPoint(e) {
            this.talent_point = e
        }
        saveSignInfo() {
            let e = Date.now(),
                t = Math.floor(e / 1e3 / 60 / 60 / 24);
            this.signData.preDayCount++,
                this.signData.preSignTime = t,
                Laya.LocalStorage.setItem(this.dayCountStr, JSON.stringify(this.signData))
        }
        getSignInfo() {
            let e = Laya.LocalStorage.getItem(this.dayCountStr),
                t = null;
            t = e ? JSON.parse(e) : new E(0, 0),
                this.signData = t;
            let s = Date.now(),
                i = Math.floor(s / 1e3 / 60 / 60 / 24) - t.preSignTime;
            return 1 == i ? (t.preDayCount %= 6, [t.preDayCount, !0]) : 0 == i ? (t.preDayCount %= 7, [t.preDayCount, !1]) : [0, !0]
        }
    }
    class E {
        constructor(e, t) {
            this.preDayCount = e,
                this.preSignTime = t
        }
    }
    class A extends y {
        constructor() {
            super(...arguments),
                this.fingerTipFlag = !1,
                this.enemyOutDis = 20,
                this.enemyPoolName = "",
                this.initSk = !1,
                this.recoverSK = !1,
                this.firstHurt = !0,
                this.fingerFirstType = -1,
                this.hurtIconPosX = 7,
                this.hurtIconPosY = -50,
                this.hurtEffType = 0,
                this.hurtEffGapX = -35,
                this.hurtEffGapY = 0,
                this.hurtEffGapRota = 0,
                this.hurtNumX = 0,
                this.hurtNumY = -200
        }
        onAwake() {
            super.onAwake(),
                this.humanClass = 1,
                this.hpBar = this.owner.getChildByName("hp_bar"),
                this.name = this.owner.name,
                this.enemyPoolName = this.name.split("_")[0] + "_enemy",
                this.enemy_id = parseInt(this.name.split("_")[1]) % 100
        }
        playEnemy() {}
        onEnable() {
            this.enemyOutDis = 20,
            this.hpBar && (this.hpBar.value = 1, this.hpBar.visible = !0),
                this.firstHurt = !0,
                this.isDie = !1,
                this.initHumanAtt(),
                Laya.timer.frameOnce(50, this, this.initFirstFinger)
        }
        initHumanAtt() {}
        initFirstFinger() {
            -1 == this.fingerFirstType || B.Instance.firstPlayerType[this.fingerFirstType] || (this.fingerSK = Le.Instance.addFirstFinger(), this.fingerSK.pos(this.getSite().x, this.getSite().y), u.Language == h.CN ? this.fingerSK.play(0, !0) : this.fingerSK.play(1, !0))
        }
        getName() {
            return this.name
        }
        changeEnemySkin(e, t, s, i) {
            6 == this.humanClass || this.humanClass > 10 || m.Instance.getTempletLoadOver() && (this.direction = e, this.enemy = m.Instance.getSkeleton("enemy", 1), this.initSk = !0, this.owner.addChild(this.enemy), this.enemy.play("fire_body_" + (this.direction + 1) + "_stand", !0), this.enemy.pos(7, 119), this.enemy.zOrder = 1, this.hpBar.zOrder = 1, this.enemy.replaceSlotSkinByIndex("head", 0, t), this.enemy.replaceSlotSkinByIndex("cloth", 0, s), this.enemy.replaceSlotSkinByIndex("cloth_out", 0, s), this.enemy.replaceSlotSkinByIndex("gun", 0, i), this.enemy.replaceSlotSkinByIndex("gun_fire", 0, i), this.gun_type = C.Instance.getItemConfig()[0][i].Gun_Type)
        }
        addBossIcon(t) {
            switch (this.icon = new Laya.Sprite, t) {
                case 1:
                    let s = X.Instance.getGlobalConfigInfo(),
                        i = s.Madness_Chance / 1e4;
                    if (Math.random() < i && 6 != this.humanClass) {
                        e.l("触发狂暴了---------------"),
                            this.fireSK = Laya.Pool.getItemByCreateFun("mult_gold_3", m.Instance.firePlayerTmep.buildArmature.bind(m.Instance.firePlayerTmep, 0), m.Instance.firePlayerTmep),
                            this.owner.addChild(this.fireSK),
                            this.fireSK.y = 109,
                            this.fireSK.x = 10,
                            this.fireSK.scale(.8, .9),
                            this.fireSK.play(0, !0);
                        let t = this.atk * (s.Madness_DPSUp / 1e4);
                        e.l("当前增加的攻击力 ====>" + t),
                            this.atk += t,
                            this.shoot_speed[3] = this.shoot_speed[3] - this.shoot_speed[3] * (s.Madness_AKTime / 1e4),
                            this.hp = this.hp - this.hp * s.Madness_HPReduce / 1e4
                    }
                    break;
                case 3:
                    this.icon.loadImage("battle/enemy_icon_1.png"),
                        this.icon.name = "icon",
                        this.owner.addChild(this.icon),
                        this.icon.pos(-72, -52);
                    break;
                case 5:
                    this.icon.loadImage("battle/enemy_icon_2.png"),
                        this.icon.name = "icon",
                        this.owner.addChild(this.icon),
                        this.icon.pos(-72, -52)
            }
        }
        addHurtIcon() {
            this.sk_func = m.Instance.addATKTargetSK(this.owner, this.hurtIconPosX, this.hurtIconPosY, !0)
        }
        hurtEff() {
            this.initHurtAtt(),
                0 == this.hurtEffType ? m.Instance.addBloodSKEff(Le.Instance.getEffGroup(), this.humanSp.x + this.hurtEffGapX, this.humanSp.y + this.hurtEffGapY) : m.Instance.addATKEffSK(Le.Instance.getEffGroup(), this.humanSp.x + this.hurtEffGapX, this.humanSp.y + this.hurtEffGapY, !1, this.hurtEffGapRota),
            this.hpBar && (this.hpBar.skin = "battle/hp_enemy_eff.png", Laya.timer.once(200, this, () => {
                this.hpBar.skin = "battle/hp_enemy.png"
            }))
        }
        initHurtAtt() {}
        hurtListener(e) {}
        hurtEffGameUI(e) {}
        atkLisenter() {
            this.enemy.on(Laya.Event.LABEL, this, e => {
                e && "attack_end" == e.name && null !== this.atkHuman && null !== this.atkHuman && this.atkHuman.subHp(this.atk)
            })
        }
        hurt(e, t) {
            this.fingerSK && (this.fingerSK.removeSelf(), this.fingerSK.destroy(!0), this.fingerSK = null, B.Instance.firstPlayerType[this.fingerFirstType] = !0, B.Instance.saveFirstPlayer()),
            this.firstHurt && (this.firstHurt = !1, this.hurtListener(e)),
            this.enemyOutDis >= 0 && (this.humanSp.x += 5, this.enemyOutDis -= 5),
            this.hpBar && (this.hpBar.value = this.hp / this.fullHp),
                this.hurtEffGameUI(e),
                I.createNumberHurt(Le.Instance.getEffGroup(), e + "", t, this.humanSp.x + this.hurtNumX, this.humanSp.y + this.hurtNumY)
        }
        judgeEnemyType() {
            return (6 == this.enemy_id || 11 == this.enemy_id || 16 == this.enemy_id) && (this.enemy_id = 0, !0)
        }
        die() {
            super.die();
            let e = Math.floor(4 * Math.random() + 1);
            o.playSceneSound("enemy_" + e),
                Le.Instance.shoot_dir.visible = !1,
            this.hpBar && (this.hpBar.visible = !1),
                this.specialDie()
        }
        specialDie() {
            _.Dispatch(g.EnemyDie, this.getSite(), this.name);
            let e = this.humanSp.x + 7,
                t = this.humanSp.y;
            _.Dispatch(g.AddEnemyDie, e, t),
                Laya.timer.once(80, this, () => {
                    this.owner.removeSelf()
                })
        }
        shootAnim() {
            super.shootAnim(),
                this.enemy.play("fire_body_" + (this.direction + 1), !1)
        }
        moveSelf(e) {
            let t = this.humanSp.x - 150 * e,
                s = Laya.Tween.to(this.humanSp, {
                    y: 755
                }, 500, null, Laya.Handler.create(this, () => {
                    X.Instance.pushTween(s),
                        s = Laya.Tween.to(this.humanSp, {
                            x: t
                        }, 200 * (e + 1) + 300, null),
                        X.Instance.pushTween(s)
                }))
        }
        onDisable() {
            Laya.timer.clearAll(this),
                this.enemy.removeSelf(),
                m.Instance.cycleSkeleton("enemy", this.enemy)
        }
    }
    class D extends Laya.Script {
        constructor() {
            super(...arguments),
                this.isInit = !1,
                this.isRota = !1,
                this.update_count = 0
        }
        onAwake() {
            this.bulletSelf = this.owner
        }
        resetData() {}
        init(e, t, s, i, a, n) {
            this.type = e,
                this.site = t,
                this.updateSelfSite(),
                this.atk = s,
                this.speed = i,
                this.human = a,
                this.setAtkTarget(this.human),
                this.isInit = !0,
                this.isRota = n
        }
        updateSelfSite() {
            null != this.bulletSelf && null != this.bulletSelf && (this.bulletSelf.x = this.site.x, this.bulletSelf.y = this.site.y, this.isRota && (this.bulletSelf.rotation += 15))
        }
        setAtkTarget(e) {
            this.human = e,
                null != this.human && null != this.human ? (this.targetSite = this.human.getSite(), this.targetSite.x -= Le.Instance.level_curr_len, this.getDis()) : void 0 !== this.bulletSelf && null !== this.bulletSelf ? this.owner.removeSelf() : R.Instance.recoverBullet(this)
        }
        getDis() {
            let e = this.targetSite.x - this.site.x,
                t = this.targetSite.y - this.site.y,
                s = Math.abs(e / t);
            this.dis = {},
                this.dis.x = this.speed * (e >= 0 ? 1 : -1),
                this.dis.y = 1 * this.speed / s * (t >= 0 ? 1 : -1),
                this.isMoveTarget = !1
        }
        update() {
            if (!this.isMoveTarget && (this.update_count++, this.site.x += this.dis.x, this.site.y += this.dis.y, this.updateSelfSite(), 0 == this.type && this.update_count % 5 == 0 && m.Instance.addSmokeAnimSK(this.owner.parent, this.bulletSelf.x - 5 * this.dis.x, this.bulletSelf.y - 5 * this.dis.y), this.judgeCollider())) {
                let e = this.human.getSite();
                if (m.Instance.addSkillEffSk(Le.Instance.effGroup, e.x - Le.Instance.level_curr_len, e.y, !1), o.playSceneSound("bomb"), this.human.subHp(this.atk), this.isMoveTarget = !0, null !== this.bulletSelf && void 0 !== this.bulletSelf)
                    return void Laya.timer.once(m.Instance.getSKILLEffTimer(), this, () => {
                        this.owner.removeSelf()
                    });
                R.Instance.recoverBullet(this)
            }
        }
        judgeCollider() {
            return Math.abs(this.site.x - this.targetSite.x) < 20
        }
        hasMoveTarget() {
            return this.isMoveTarget
        }
        onDisable() {
            void 0 !== this.bulletSelf && null !== this.bulletSelf && R.Instance.recoverBulletNode(this.type, this.owner)
        }
    }
    class R {
        constructor() {
            this.prefabUrl = ["prefabs/bullet/rpg_bullet.json"],
                this.bulletArray = []
        }
        static get Instance() {
            return null !== R._instance && void 0 !== R._instance || (R._instance = new R),
                R._instance
        }
        createBullet(e, t, s, i, a) {
            let n = Laya.Pool.getItemByClass("bullet", D);
            n.init(e, t, s, i, a),
                this.bulletArray.push(n)
        }
        createBulletToBulletGroup(e, t, s, i, a, n) {
            let o = Laya.loader.getRes(this.prefabUrl[e]);
            null == o ? Laya.loader.load(this.prefabUrl[e], Laya.Handler.create(this, () => {
                this.createBulletNode(e, t, s, i, a, n)
            })) : this.createBulletNode(e, t, s, i, a, n)
        }
        createBulletNode(e, t, s, i, a, n = 0) {
            if (null === this.prefab || void 0 === this.prefab) {
                let t = Laya.loader.getRes(this.prefabUrl[e]);
                this.prefab = new Laya.Prefab,
                    this.prefab.json = t
            }
            let o = Laya.Pool.getItemByCreateFun(this.prefabUrl[e], this.prefab.create, this.prefab);
            this.bulletGroup.addChild(o),
                o.rotation = n;
            let h = o.getComponent(D);
            h.init(e, t, s, i, a, !1),
                this.bulletArray.push(h)
        }
        recoverBulletNode(e, s) {
            t.cycleObject(this.prefabUrl[e], s)
        }
        recoverBullet(e) {
            t.cycleObject("bullet", e)
        }
        updateBulletArray() {
            for (let e = this.bulletArray.length - 1; e >= 0; e--) {
                let t = this.bulletArray[e];
                t.update(),
                t.hasMoveTarget() && this.bulletArray.splice(e, 1)
            }
        }
        set BulletGroup(e) {
            this.bulletGroup = e
        }
    }
    class G extends Laya.Script {
        constructor() {
            super(...arguments),
                this.update_count = 0
        }
        onAwake() {
            this.selfSp = this.owner
        }
        init(e, t, s, i, a) {
            if (this.selfSp.x = e.x, this.selfSp.y = e.y, this.rota = a, this.atk = s, this.moveDis = {}, null == t || null == t)
                this.moveDis.x = i, this.moveDis.y = 0;
            else {
                this.human = t;
                let s = e.x - t.getSite().x,
                    a = e.y - t.getSite().y,
                    n = Math.abs(s / a);
                this.moveDis.x = i * (s <= 0 ? 1 : -1),
                    this.moveDis.y = i / n * (a <= 0 ? 1 : -1)
            }
        }
        onEnable() {
            Laya.timer.frameLoop(1, this, this.updateBullet),
                this.update_count = 0
        }
        updateBullet() {
            if (X.Instance.PauseGame)
                return;
            if (this.update_count++, this.selfSp.x += this.moveDis.x, this.selfSp.y += this.moveDis.y, 0 !== this.rota && (this.selfSp.rotation += this.rota), this.update_count % 5 == 0 && this.moveEff(), this.selfSp.x > 900 - Le.Instance.level_curr_len || this.selfSp.y < 0)
                return this.bombEff(), void this.removeSelfNode();
            let e = X.Instance.EnemyArray,
                t = !1;
            for (let s = 0; s < e.length; s++) {
                const i = e[s];
                if (i == this.human && (t = !0), this.judgeCollider(i))
                    return i.subHp(this.atk, 1), this.bombEff(), void this.removeSelfNode()
            }
            !t && this.judgeHuman() && !this.human.hasDie() && this.judgeCollider(this.human) && (this.human.subHp(this.atk), this.bombEff(), this.removeSelfNode())
        }
        moveEff() {}
        bombEff() {}
        removeSelfNode() {
            this.owner.removeSelf()
        }
        judgeCollider(e) {
            let t = e.getSite();
            return Math.abs(this.selfSp.x - t.x) < 50 && Math.abs(this.selfSp.y - t.y) < 50
        }
        judgeHuman() {
            return null !== this.human && void 0 !== this.human
        }
        onDisable() {
            O.Instance.recoverFlyCut(this.owner),
                Laya.timer.clearAll(this)
        }
    }
    class P extends Laya.Script {
        constructor() {
            super(...arguments),
                this.advance = !0,
                this.speed = 10,
                this.retreatCount = 0,
                this.die = !0,
                this.count_dog_dam = 0,
                this.atk_count = 0
        }
        onAwake() {
            this.selfSp = this.owner
        }
        init(e, t, s) {
            this.selfSp.x = t,
                this.selfSp.y = 710,
                this.atk = e,
                this.time = s,
                this.advance = !0,
                this.retreatCount = 0,
                this.die = !1,
                Laya.timer.once(s, this, () => {
                    this.die = !0
                })
        }
        onUpdate() {
            if (!X.Instance.PauseGame && ((this.advance || this.die) && (this.selfSp.x += this.speed, this.selfSp.x > 900 - Le.Instance.level_curr_len && (this.owner.removeSelf(), o.stopSound("wheel"))), !this.die && this.advance))
                for (let e = 0; e < X.Instance.EnemyArray.length; e++) {
                    const t = X.Instance.EnemyArray[e];
                    if (t.getSite().x < 800 - Le.Instance.level_curr_len && t.collider(this.getRect())) {
                        this.advance = !1,
                            this.enemy = t;
                        let e = Math.floor(this.atk);
                        this.atk_count += this.atk - e;
                        let s = Math.floor(this.atk_count);
                        this.atk_count -= s,
                            t.subHp(e + s, 1),
                            Laya.timer.clear(this, this.atkEnemy),
                            Laya.timer.loop(100, this, this.atkEnemy)
                    }
                }
        }
        atkEnemy() {
            if (null == this.enemy || null == this.enemy)
                return this.advance = !0, void Laya.timer.clear(this, this.atkEnemy);
            let e = Math.floor(this.atk);
            this.atk_count += this.atk - e;
            let t = Math.floor(this.atk_count);
            this.atk_count -= t,
                _.Dispatch(g.SkillEff, 2),
                this.enemy.subHp(e + t, 1),
            this.enemy.hasDie() && (Laya.timer.clear(this, this.atkEnemy), this.advance = !0)
        }
        dogMove() {
            let e = this.selfSp.x - 100;
            Laya.Tween.to(this.selfSp, {
                x: e
            }, 550, null, Laya.Handler.create(this, () => {
                Laya.Tween.to(this.selfSp, {
                    x: e + 100
                }, 550, null, Laya.Handler.create(this, () => {
                    null != this.enemy && null != this.enemy ? (this.enemy.subHp(this.atk, 1), this.enemy.hasDie() ? this.advance = !0 : this.dogMove()) : this.advance = !0
                }))
            }))
        }
        getRect() {
            let e = {};
            return e.x = this.selfSp.x - this.selfSp.pivotX,
                e.y = this.selfSp.y - this.selfSp.pivotY,
                e.width = 150,
                e.height = 50,
                e
        }
        onDisable() {
            Laya.timer.clearAll(this),
                O.Instance.recoverDog(this.owner)
        }
    }
    class M extends G {
        onAwake() {
            super.onAwake()
        }
        onEnable() {
            super.onEnable(),
                _.AddListener(g.StopGame, this, () => {
                    Laya.timer.clearAll(this)
                })
        }
        init(e, t, s, i) {
            if (this.selfSp.x = e.x, this.selfSp.y = e.y, this.rota = 0, this.atk = s, this.moveDis = {}, null == t || null == t)
                this.moveDis.x = i, this.moveDis.y = 0, this.selfSp.rotation = 0;
            else {
                this.human = t;
                let s = e.x - t.getSite().x,
                    a = e.y - t.getSite().y,
                    n = Math.abs(s / a),
                    o = Math.atan(a / s) / (Math.PI / 180);
                this.selfSp.rotation = o,
                    this.moveDis.x = i * (s <= 0 ? 1 : -1),
                    this.moveDis.y = i / n * (a <= 0 ? 1 : -1)
            }
        }
        moveEff() {
            m.Instance.addSmokeAnimSK(this.owner.parent, this.selfSp.x - 5 * this.moveDis.x, this.selfSp.y - 5 * this.moveDis.y)
        }
        bombEff() {
            o.playSceneSound("bomb"),
                _.Dispatch(g.SkillEff, 20, 50, 3),
                m.Instance.addSkillEffSk(this.owner.parent, this.selfSp.x, this.selfSp.y)
        }
        removeSelfNode() {
            this.owner.removeSelf()
        }
        onDisable() {
            O.Instance.recoverRocket(this.owner),
                Laya.timer.clearAll(this)
        }
    }
    class N extends Laya.Script {
        constructor() {
            super(...arguments),
                this.die = !1,
                this.recover = !1,
                this.atk_human = []
        }
        onAwake() {
            this.self_sp = this.owner,
                this.bomb = this.owner.getChildByName("bomb")
        }
        onEnable() {
            super.onEnable(),
                this.recover = !1,
                this.bomb_sk = m.Instance.getSkeleton("air_bomb_2"),
                this.self_sp.addChild(this.bomb_sk)
        }
        init(e, t, s, i) {
            this.scope = s,
                this.atk = t,
                this.self_sp.x = e.x,
                this.self_sp.y = e.y,
                this.die = !1,
                this.bomb.visible = !0,
                this.poolName = i
        }
        move() {
            return !!this.die || (this.self_sp.y += 7, this.self_sp.y >= 750)
        }
        judgeEnemy(e) {
            if (this.die)
                return !0;
            this.die = !0,
                this.atk_human = [];
            for (let t = 0; t < e.length; t++) {
                const s = e[t];
                let i = s.getSite().x - this.self_sp.x;
                Math.abs(i) > this.scope || (s.subHp(this.atk, 1), this.atk_human.push(s))
            }
            return this.die && (this.bomb.visible = !1, _.Dispatch(g.SkillEff, 10), o.playSceneSound("bomb"), this.bomb_sk.play(0, !1), Laya.timer.once(m.Instance.getAirBombTimer(), this, () => {
                this.owner.removeSelf()
            })),
                !0
        }
        getSite() {
            return {
                x: this.self_sp.x,
                y: this.self_sp.y
            }
        }
        onDisable() {
            this.bomb_sk && this.bomb_sk.removeSelf(),
                m.Instance.cycleSkeleton("air_bomb_2", this.bomb_sk),
                t.cycleObject(this.poolName, this.owner),
                this.owner.removeSelf()
        }
    }
    class O {
        constructor() {
            this.prefabUrl = ["prefabs/flyCutter.json", "prefabs/dog.json", "prefabs/air_bomb.json", "prefabs/Rocket.json"],
                this.propPrefabs = []
        }
        static get Instance() {
            return null !== this.instance && void 0 !== this.instance || (this.instance = new O),
                this.instance
        }
        createPropNode(e) {
            let t = Laya.loader.getRes(this.prefabUrl[e]),
                s = new Laya.Prefab;
            s.json = t,
                this.propPrefabs[e] = s
        }
        createFlyCut(e, t, s, i, a = 0) {
            null !== this.propPrefabs[0] && void 0 !== this.propPrefabs[0] || this.createPropNode(0);
            let n = Laya.Pool.getItemByCreateFun("flyCut", this.propPrefabs[0].create, this.propPrefabs[0]),
                o = n.getComponent(G);
            this.propGroup.addChild(n),
                e.x -= Le.Instance.level_curr_len,
                o.init(e, t, s, i, a)
        }
        createRocket(e, t, s, i) {
            null !== this.propPrefabs[3] && void 0 !== this.propPrefabs[3] || this.createPropNode(3);
            let a = Laya.Pool.getItemByCreateFun("rocket", this.propPrefabs[3].create, this.propPrefabs[3]),
                n = a.getComponent(M);
            this.propGroup.addChild(a),
                e.x -= Le.Instance.level_curr_len,
                n.init(e, t, s, i)
        }
        createDog(e, t, s) {
            null !== this.propPrefabs[1] && void 0 !== this.propPrefabs[1] || this.createPropNode(1);
            let i = Laya.Pool.getItemByCreateFun("dog", this.propPrefabs[1].create, this.propPrefabs[1]),
                a = i.getComponent(P);
            this.propGroup.addChild(i),
                e -= Le.Instance.level_curr_len,
                a.init(t / 10, e, s)
        }
        createAirBomb(e, t, s) {
            null !== this.propPrefabs[2] && void 0 !== this.propPrefabs[2] || this.createPropNode(2);
            let i = Laya.Pool.getItemByCreateFun("air_bomb_pf", this.propPrefabs[2].create, this.propPrefabs[2]),
                a = i.getComponent(N);
            this.propGroup.addChild(i),
                a.init(t, e, s, "air_bomb_pf"),
                X.Instance.air_bomb.push(a)
        }
        recoverBomb(e) {
            t.cycleObject("bomb", e)
        }
        recoverDog(e) {
            t.cycleObject("dog", e)
        }
        recoverFlyCut(e) {
            t.cycleObject("flyCut", e)
        }
        recoverRocket(e) {
            t.cycleObject("rocket", e)
        }
        set PropGroup(e) {
            this.propGroup = e
        }
    }
    class U extends A {
        constructor() {
            super(...arguments),
                this.rudio = 300
        }
        onAwake() {
            super.onAwake(),
                this.fingerFirstType = c.FirstPlayer.OIL_DAM,
                this.humanClass = 6,
                this.rudio = X.Instance.getGlobalConfigInfo().Oildam_Range,
                this.enemyPoolName = "oil_dum_enemy"
        }
        onEnable() {
            super.onEnable(),
                n.l("初始化自爆兵---------------"),
                this.enemy = m.Instance.getSkeleton("enemy_sp/oil_drum"),
                this.owner.addChild(this.enemy),
                this.enemy.pos(35, 121),
                this.enemy.play("stay", !0)
        }
        initHumanAtt() {
            this.hurtEffType = 1,
                this.enemyOutDis = -1,
                this.hurtIconPosX = 35,
                this.hurtIconPosY = -43,
                this.hurtEffGapX = 0,
                this.hurtEffGapY = -41
        }
        atkTarget(e) {}
        shootLoop() {}
        updateAtkHuman() {}
        shoot() {}
        set PlayerSite(e) {
            this.playerSite = e;
            let t = Math.abs(this.playerSite.x - this.humanSp.x),
                s = Math.abs(this.playerSite.y - this.humanSp.y);
            this.hurtEffGapRota = 180 * -Math.atan(s / t) / Math.PI,
                this.hurtEffGapRota %= 90,
                n.l("当前的角度 === " + this.hurtEffGapRota)
        }
        bombNearEnemy(e) {
            this.enemy.play("bomb", !1),
                this.hpBar.visible = !1;
            for (let t = 0; t < e.length; t++) {
                const s = e[t];
                if (this == s)
                    continue;
                let i = s.getSite(),
                    a = Math.abs(this.getSite().x - i.x);
                if (a < this.rudio) {
                    let e = Math.abs(this.getSite().y - i.y);
                    Math.sqrt(a * a + e * e) < this.rudio && s.subHp(this.atk)
                }
            }
            n.l("当前油桶的poolName == " + this.enemyPoolName + "  时间: " + m.Instance.getOilDrumTimer())
        }
        onDisable() {
            this.enemy.removeSelf(),
                m.Instance.cycleSkeleton("enemy_sp/oil_drum", this.enemy),
                n.l("disable 油桶-----------------" + this.enemyPoolName)
        }
    }
    class F extends A {
        constructor() {
            super(...arguments),
                this.isBomb = !1,
                this.move = !1,
                this.scope = 20,
                this.rudio = 50,
                this.initSuccess = !0
        }
        onAwake() {
            super.onAwake(),
                this.fingerFirstType = c.FirstPlayer.BOMB_SELF,
                this.enemyPoolName = "bomb_man_enemy_pf",
                this.speed = X.Instance.getGlobalConfigInfo().MoveSpeed / 4,
                this.humanClass = 10,
                e.l("自爆兵龙骨已经初始化-----------")
        }
        onEnable() {
            super.onEnable(),
                this.enemy = m.Instance.getSkeleton("enemy_sp/bomb_man_2"),
                this.owner.addChild(this.enemy),
                this.enemy.pos(36, 120),
                this.enemy.play("walk", !0)
        }
        initHumanAtt() {
            this.hurtIconPosX = 19,
                this.hurtIconPosY = -66,
                this.isBomb = !1,
                this.initSuccess = !0
        }
        onUpdate() {
            this.isBomb || this.isDie || X.Instance.PauseGame || !this.initSuccess || (this.humanSp.x + Le.Instance.level_curr_len < 180 && !this.move && (this.isBomb = !0, this.hp = 0, this.isDie = !0, this.die(), e.l("自爆兵开始爆炸了-------------")), this.humanSp.x -= this.speed, this.fingerSK && this.fingerSK.pos(this.getSite().x, this.getSite().y))
        }
        atkTarget(e) {}
        dieOver() {}
        specialDie() {
            this.enemy.play("attack", !1),
                Laya.timer.once(m.Instance.getBombSelfEnemyTimer(), this, () => {
                    this.owner.removeSelf()
                })
        }
        bombNearHuman(t) {
            for (let s = 0; s < t.length; s++) {
                const i = t[s];
                if (i === this) {
                    console.error("碰撞体相等了----------------");
                    continue
                }
                let a = i.getRect();
                e.l("当前碰撞对象 === ", this.getRect(), i.getRect());
                Math.abs(this.humanSp.x - a.x);
                this.collider(a) && i.subHp(this.atk, 1)
            }
        }
        moveSelf() {
            this.initSuccess = !1;
            let e = Laya.Tween.to(this.humanSp, {
                y: 748
            }, 200, null, Laya.Handler.create(this, () => {
                this.initSuccess = !0
            }));
            X.Instance.pushTween(e)
        }
        onDisable() {
            this.enemy.removeSelf(),
                m.Instance.cycleSkeleton("enemy_sp/bomb_man_2", this.enemy),
                e.l("disable 自爆兵-----------------" + this.enemyPoolName),
                t.cycleObject(this.enemyPoolName, this.owner)
        }
    }
    class H extends A {
        constructor() {
            super(...arguments),
                this.flyPause = !1,
                this.move = !1,
                this.scope = 20
        }
        onAwake() {
            super.onAwake(),
                this.fingerFirstType = c.FirstPlayer.FLY_MAN,
                this.speed = X.Instance.getGlobalConfigInfo().MoveSpeed / 4,
                this.enemyPoolName = "fly_man_enemy_pf",
                this.humanClass = 9
        }
        onEnable() {
            super.onEnable(),
                this.enemy = m.Instance.getSkeleton("enemy_sp/flying_soldier"),
                this.owner.addChild(this.enemy),
                this.enemy.pos(38, 70),
                this.enemy.play("fly", !0)
        }
        initHumanAtt() {
            this.move = !1,
                this.flyPause = !1,
                this.hurtIconPosX = 19,
                this.hurtIconPosY = -64
        }
        onUpdate() {
            this.flyPause || X.Instance.PauseGame || (this.humanSp.x + Le.Instance.level_curr_len < 180 && !this.move && (this.flyPause = !0, n.l("当前飞行的时间: " + X.Instance.getGlobalConfigInfo().FlyMan_BombTime), Laya.timer.once(X.Instance.getGlobalConfigInfo().FlyMan_BombTime, this, this.intervalBomb)), this.humanSp.x -= this.speed, this.fingerSK && this.fingerSK.pos(this.getSite().x, this.getSite().y), this.humanSp.x + Le.Instance.level_curr_len < -180 && (this.move = !1, this.flyPause = !0, this.die()))
        }
        intervalBomb() {
            this.isDie || (this.move = !0, this.enemy.play("attack", !1), this.flyPause = !1, this.isDie = !0, this.createFlyManBomb())
        }
        createFlyManBomb() {
            n.l("当前的生命值: " + this.hp);
            let e = {
                x: this.humanSp.x,
                y: this.humanSp.y
            };
            if (null === this.flyBombPrefab || void 0 === this.flyBombPrefab) {
                this.flyBombPrefab = new Laya.Prefab;
                let e = Laya.loader.getRes("prefabs/bullet/fly_man_bullet.json");
                this.flyBombPrefab.json = e
            }
            let t = Laya.Pool.getItemByCreateFun("fly_man_bullet", this.flyBombPrefab.create, this.flyBombPrefab),
                s = t.getComponent(N);
            Le.Instance.bulletGroup.addChild(t),
                s.init(e, this.atk, this.scope, "fly_man_bullet"),
                X.Instance.flyManBomb.push(s)
        }
        specialDie() {
            n.l("飞行兵死亡=--------------"),
                Laya.timer.clear(this, this.intervalBomb),
                this.enemy.play("dead", !1),
                Laya.timer.once(m.Instance.getFlyManTimer(), this, () => {
                    this.owner.removeSelf()
                })
        }
        onDisable() {
            this.enemy.removeSelf(),
                m.Instance.cycleSkeleton("enemy_sp/flying_soldier", this.enemy),
                n.l("disable 飞行兵-----------------" + this.enemyPoolName),
                t.cycleObject(this.enemyPoolName, this.owner)
        }
    }
    var K = c.DropConfig,
        j = c.LevelCustem,
        W = c.MonsterConfig,
        V = c.EquipDropConfig,
        Y = c.ShareCount,
        q = c.SpecialEnemy;
    class X {
        constructor() {
            this.pauseGame = !1,
                this.gameResult = !1,
                this.gameOver = !1,
                this.gameProgress = 0,
                this.skill_att = [],
                this.boss_site = 0,
                this.dis = 0,
                this.gold = 0,
                this.level = 1,
                this.super_add_gold = 0,
                this.currLevelCreateSpecialEnemy = !1,
                this.bombCountLimit = 0,
                this.rugMoveLen = 0,
                this.rugMoveFlag = !1,
                this.levelRugMove = !1,
                this.prop_num_0 = [],
                this.prop_0_num = 0,
                this.prop_num_2 = [],
                this.prop_2_num = 0,
                this.bombCount = 0,
                this.treasureType = ["SafeBox_FreeNum", "SafeBox_VideoNum", "SafeBox_ShareNum"],
                this.tweenArray = [],
                this.all_skill_att = [],
                this.flyManBomb = [],
                this.bombSelfMan = [],
                this.commonEnemys = [],
                this.flyEnemys = [],
                this.bombEnemys = [],
                _.AddListener(g.PauseGame, this, this.pauseGameController),
                _.AddListener(g.ResumeGame, this, this.resumerGameController),
                _.AddListener(g.ExitGame, this, this.exitGame),
                _.AddListener(g.InitPlayer, this, this.initPlayerSkin),
                _.AddListener(g.CreateEnemyClass, this, this.createEnemyClass)
        }
        static get Instance() {
            return null !== this.instance && void 0 !== this.instance || (this.instance = new X),
                this.instance
        }
        addShareGoldAward() {
            return this.globalConfigInfo.Gold_add * this.getLevelEarnings()
        }
        reGame(e = !1) {
            _.Dispatch(g.InitInterstitialAD),
                this.PauseGame = !1,
                this.gameResult = !1,
                this.gameOver = !1,
                this.levelRugMove = !1,
                this.currLevelCreateSpecialEnemy = !1,
                this.boss_site = -100,
                this.prop_num_0 = [],
                this.treasures = [],
                this.weapon_box = [],
                this.air_bomb = [],
                this.bombSelfMan = [],
                this.commonEnemys = [],
                this.flyEnemys = [],
                this.bombEnemys = [],
                this.createBombEnemyFunc = null;
            for (let e = this.tweenArray.length - 1; e >= 0; e--) {
                this.tweenArray[e].recover(),
                    this.tweenArray.splice(e, 1)
            }
            this.tweenArray = [],
                this.all_skill_att = [],
                this.flyManBomb = [],
                this.gameProgress = 0,
                _.Dispatch(g.ReGame),
            e || _.Dispatch(g.CurrentLevel, X.Instance.level)
        }
        loseGame() {
            this.gameResult = !1,
                this.gameOver = !0,
                this.pauseGame = !0,
                Laya.timer.clear(this, this.createBomb),
                this.recoverAllEnemy(),
                this.clearGameCache(),
                _.Dispatch(g.AppendBox, "prefabs/Popp/ResultPopp.json")
        }
        winGame() {
            this.gameOver = !0,
                this.gameResult = !0,
                this.pauseGame = !0,
                this.level++,
                Laya.timer.clear(this, this.createBomb),
                this.recoverAllEnemy(),
                B.Instance.saveGameData(),
                this.clearGameCache(),
                _.Dispatch(g.AppendBox, "prefabs/Popp/ResultPopp.json")
        }
        recoverAllEnemy() {
            m.Instance.recoverEnemyDieSk()
        }
        init(e, t) {
            this.air_bomb = [];
            let s = [],
                i = null;
            this.monster_count = 0,
            (void 0 === this.propConfigInfo || this.propConfigInfo.length < 1) && (this.propConfigInfo = C.Instance.getSkillConfig());
            for (let e = 0; e < this.propConfigInfo.length; e++) {
                const t = this.propConfigInfo[e];
                this.skill_att[e] = t[this.skillsData[e]]
            }
            this.playerScript = e,
                this.enemyArray = t;
            let a = this.playerScript.getSite().y,
                n = this.levelCustemInfo[this.level - 1];
            for (let e = 0; e < this.enemyArray.length; e++) {
                const t = this.enemyArray[e];
                let o,
                    h,
                    r = this.getMonsterObj(t.getName()),
                    l = Math.abs(t.getSite().y - a),
                    p = 0;
                switch (p = l < 100 ? 0 : l < 300 ? 1 : 2, r.Monster_Type) {
                    case 1:
                        h = n.Normal_HP,
                            o = n.Normal_dam;
                        break;
                    case 3:
                        h = n.Rare_HP,
                            o = n.Rare_dam;
                        break;
                    case 5:
                        h = n.Boss_HP,
                            o = n.Boss_dam,
                            this.boss_site = t.getSite().x
                }
                let d = o / (r.Monster_GunParameter[1] / ((r.Monster_GunParameter[2] + r.Monster_GunParameter[3]) / 1e3));
                11 == t.HumanClass && (i = t),
                    6 == t.HumanClass ? (h = "Secen_151" == n.Scene_ID ? n.Boss_HP / 10 : n.Normal_HP / 2, d = n.Oil_dam, s.push(t.getSite()), t.init(h, d, r.Monster_GunParameter, 0, r.Monster_Gun, !0, r.Monster_Type)) : (t.init(h, d, r.Monster_GunParameter, 0, r.Monster_Gun, !0, r.Monster_Type), t.changeEnemySkin(p, r.Monster_Helmet - 1, r.Monster_cloth - 1, r.Monster_Gun - 1)),
                    t.addBossIcon(r.Monster_Type)
            }
            "Secen_151" == n.Scene_ID && i.addMoveTarget(s)
        }
        initPlayerSkin(t) {
            t = t[0];
            let s = B.Instance.getMaxWeapon()(),
                i = C.Instance.getItemConfig(),
                a = i[0][s[0] - 1],
                n = i[1][s[1] - 1],
                o = i[2][s[2] - 1];
            t.changePlayerSkin(s[1] - 1, s[0] - 1, s[2] - 1, s[2] - 1);
            let h = a.Item_attri / (a.Item_Parameter[1] / ((a.Item_Parameter[2] + a.Item_Parameter[3]) / 1e3)),
                r = n.Item_attri + o.Item_attri;
            h = Math.floor(h),
                e.l("当前使用的枪械射击速度: ", a.Item_Parameter, h),
                t.init(r, h, a.Item_Parameter, 0, a.Item_Type - 1, !1, 0)
        }
        judgeAtkPlayer(e) {
            return 9 !== e.HumanClass && 10 !== e.HumanClass && 6 !== e.HumanClass
        }
        update(t) {
            this.boss_site > 0 && this.boss_site + t - 900 <= 0 && (this.boss_site = -100, _.Dispatch(g.ShowBossTip));
            let s = this.playerScript.getSite(),
                i = Number.MAX_VALUE,
                a = 0,
                n = -1;
            for (let e = this.enemyArray.length - 1; e >= 0; e--) {
                const o = this.enemyArray[e];
                if (o.hasDie()) {
                    let t = o;
                    t.bombNearEnemy && t.bombNearEnemy(this.enemyArray),
                        this.clearDieSpecialEnemy(o),
                        this.enemyArray.splice(e, 1);
                    continue
                }
                if (this.judgeAtkPlayer(o) && !o.hasAtkHuman() && o.getSite().x + t - s.x <= o.getAtkDistance() && o.atkTarget(this.playerScript), o instanceof U)
                    continue;
                a = o.getSite().x + t - s.x;
                let h = 0;
                15 == o.HumanClass && (h = 85),
                !this.playerScript.ChangeAtkTargeting && !this.playerScript.hasAtkHuman() && a <= this.playerScript.getAtkDistance(h) && a < i && (i = a, n = e)
            }
            if (-1 != n && this.enemyArray[n]) {
                this.playerScript.atkTarget(this.enemyArray[n]),
                this.levelRugMove || 13 != this.enemyArray[n].HumanClass && 12 != this.enemyArray[n].HumanClass || (this.rugMoveFlag = !0, this.levelRugMove = !0, this.moveSpeed = this.globalConfigInfo.MoveSpeed);
                let t = this.enemyArray[n].judgeEnemyType();
                e.l("当前id ===> " + t),
                !this.currLevelCreateSpecialEnemy && t && this.createSpecialMan()
            } else
                this.playerScript.hasAtkHuman() || (this.playerScript.move(), Le.Instance.moveLevel());
            this.moveRugScene(),
                this.specialColider(),
                R.Instance.updateBulletArray()
        }
        moveRugScene() {
            this.rugMoveFlag && (Le.Instance.moveLevel(), this.rugMoveLen += this.moveSpeed, this.rugMoveLen >= 90 && (this.rugMoveLen = 0, this.rugMoveFlag = !1))
        }
        clearDieSpecialEnemy(e) {
            if (e instanceof H) {
                let t = this.flyEnemys.indexOf(e);
                t >= 0 && this.flyEnemys.splice(t, 1)
            }
            if (e instanceof F) {
                let t = this.bombEnemys.indexOf(e);
                t >= 0 && this.bombEnemys.splice(t, 1)
            }
            if (e instanceof A) {
                let t = this.commonEnemys.indexOf(e);
                t >= 0 && this.commonEnemys.splice(t, 1)
            }
        }
        specialColider() {
            for (let e = this.air_bomb.length - 1; e >= 0; e--) {
                const t = this.air_bomb[e];
                t.move() && (t.judgeEnemy(this.enemyArray), this.air_bomb.splice(e, 1))
            }
            for (let e = this.flyManBomb.length - 1; e >= 0; e--) {
                const t = this.flyManBomb[e];
                if (t.move()) {
                    t.judgeEnemy(this.enemyArray);
                    let s = t.getSite();
                    Math.abs(s.x + Le.Instance.level_curr_len - this.playerScript.getSite().x) < 80 && this.playerScript.subHp(t.atk, 0),
                        this.flyManBomb.splice(e, 1)
                }
            }
            for (let e = this.bombSelfMan.length - 1; e >= 0; e--) {
                const t = this.bombSelfMan[e];
                !t.hasDie() && t.getSite().x + Le.Instance.level_curr_len < 180 && this.playerScript.subHp(t.Atk, 1),
                t.hasDie() && (t.bombNearHuman(this.enemyArray), this.bombSelfMan.splice(e, 1))
            }
        }
        useProp(e) {
            let t = this.getSkillInfo(e),
                s = 0;
            switch (e) {
                case 0:
                    o.playSkillSound("fly_equit");
                    let i = Math.floor(this.skillsData[e] / 5) + 1;
                    if (s = Math.floor(t[0] / i), O.Instance.createFlyCut(this.playerScript.getSite(), this.playerScript.getAtkHuman(), s, 20, 30), this.prop_num_0.push(1), 1 == i)
                        break;
                    this.prop_0_num = i,
                        Laya.timer.loop(100, this, this.createFlyCut, [this.prop_num_0.length - 1]);
                    break;
                case 1:
                    o.playSkillContinue("wheel"),
                        O.Instance.createDog(this.playerScript.getSite().x, t[0], t[2]);
                    break;
                case 2:
                    o.playSkillContinue("air_fly"),
                    this.air_skill_prefab || (this.air_skill_prefab = new Laya.Prefab, this.air_skill_prefab.json = Laya.loader.getRes("prefabs/air_skill.json"));
                    let a = Laya.Pool.getItemByCreateFun("air_skill", this.air_skill_prefab.create, this.air_skill_prefab);
                    Le.Instance.bg.addChild(a),
                        a.pos(-130, 219);
                    break;
                case 3:
                    o.playSkillSound("rocket"),
                        O.Instance.createRocket(this.playerScript.getSite(), this.playerScript.getAtkHuman(), t[0], 20);
                    break;
                case 4:
                    o.playSkillSound("add_hp"),
                        this.playerScript.addHp(t[0])
            }
        }
        createSpecialMan() {
            console.error("创建特殊兵种------------------");
            let e = Math.random() < this.globalConfigInfo.Extract_Fly,
                t = Math.random() < this.globalConfigInfo.Extract_Fly,
                s = this.levelCustemInfo[this.level - 1],
                i = s.Normal_HP / 2,
                a = 0;
            e ? (a = this.globalConfigInfo.InjuryK_DeadMan * s.Normal_dam, Le.Instance.createBombSelfMan(i, a), this.currLevelCreateSpecialEnemy = !0) : t && (a = this.globalConfigInfo.InjuryK_Fly * s.Normal_dam, Le.Instance.createFlyMan(i, a))
        }
        createEnemyClass(t) {
            let s = this.levelCustemInfo[this.level - 1],
                i = s.Normal_HP / 2,
                a = 0;
            switch (a = this.globalConfigInfo.InjuryK_DeadMan * s.Normal_dam, t[0]) {
                case q.COMMON_ENEMY:
                    if (e.l("创建普通兵种"), this.commonEnemys.length >= 2)
                        return;
                    let n = this.getMonsterObj("monster_1001");
                    Le.Instance.createCommonEnemy(i, a, n.Monster_GunParameter, t[1], t[2]);
                    break;
                case q.BOMB_SELF_ENEMY:
                    if (this.bombEnemys.length > 0)
                        return;
                    this.bombCount = 0,
                        this.createBomb(i, a, t[1], t[2]),
                        Laya.timer.loop(2e3, this, this.createBomb);
                    break;
                case q.FLY_MAN_ENEMY:
                    if (this.flyEnemys.length > 0)
                        return;
                    Le.Instance.createFlyMan(i, a, t[1], t[2], !0)
            }
        }
        createBomb(e, t, s, i) {
            this.bombCount++,
            this.createBombEnemyFunc || (this.createBombEnemyFunc = Le.Instance.createBombSelfMan.bind(Le.Instance, e, t, s, i, !0)),
                this.createBombEnemyFunc(),
            this.bombCount == this.bombCountLimit && Laya.timer.clear(this, this.createBomb)
        }
        createFlyCut(e) {
            this.prop_num_0[e]++;
            let t = Math.floor(this.skillsData[0] / 5) + 1,
                s = this.getSkillInfo(0),
                i = Math.floor(s[0] / t);
            O.Instance.createFlyCut(this.playerScript.getSite(), this.playerScript.getAtkHuman(), i, 20, 30),
            this.prop_num_0[e] >= this.prop_0_num && Laya.timer.clear(this, this.createFlyCut)
        }
        createAirBomb(e, t) {
            let s = Math.floor(this.skillsData[2] / 5) + 1,
                i = this.getSkillInfo(2),
                a = Math.floor(i[0] / s),
                n = {};
            n.x = 375 - Le.Instance.level_curr_len + t * e,
                n.y = 337,
                O.Instance.createAirBomb(a, n, i[2])
        }
        get EnemyArray() {
            return this.enemyArray
        }
        set PauseGame(e) {
            this.pauseGame = e
        }
        get PauseGame() {
            return this.pauseGame
        }
        pushTween(e) {
            this.tweenArray.push(e)
        }
        removeTween(e) {
            this.tweenArray.splice(this.tweenArray.indexOf(e), 1)
        }
        pauseGameController() {
            this.pauseGame = !0,
                Laya.timer.pause(),
                this.tweenArray.forEach(e => {
                    e.pause()
                })
        }
        resumerGameController() {
            this.pauseGame = !1,
                Laya.timer.resume(),
                this.tweenArray.forEach(e => {
                    e.resume()
                })
        }
        exitGame() {
            this.playerScript.clearTimer();
            for (let e = 0; e < this.enemyArray.length; e++) {
                this.enemyArray[e].clearTimer()
            }
            Le.Instance.clearGameTimer(),
                Laya.timer.resume();
            for (let e = this.tweenArray.length - 1; e >= 0; e--) {
                this.tweenArray[e].recover()
            }
            Laya.timer.clearAll(this),
                this.tweenArray = [],
                this.enemyArray = [],
                m.enemyDieArrs = []
        }
        clearGameCache() {
            for (let e = this.tweenArray.length - 1; e >= 0; e--) {
                this.tweenArray[e].recover()
            }
            this.tweenArray = [],
                this.enemyArray = [],
                o.gameOver()
        }
        initCDNConfig(e, t, s) {
            this.globalConfigInfo = e,
                this.bombCountLimit = this.globalConfigInfo.BossSK_RebelNum,
                this.functionConfigInfo = t,
                this.shareCountInfo = s
        }
        parseShareCount(e) {
            let t = e.ShareCount;
            this.shareCountInfo = new Array;
            for (let e = 0; e < t.length; e++) {
                const s = t[e];
                let i = parseInt(s.ID),
                    a = parseInt(s.Share_Count),
                    n = parseInt(s.Count_SR),
                    o = new Y(i, a, n);
                this.shareCountInfo.push(o)
            }
        }
        getGlobalConfigInfo() {
            return this.globalConfigInfo
        }
        getFunctionConfigInfo() {
            return this.functionConfigInfo
        }
        parseLevelCustem(e) {
            let t = e.LevelCustem;
            this.levelCustemInfo = new Array;
            for (let e = 0; e < t.length; e++) {
                const s = t[e];
                let i = s.Level_ID.split("_").map(e => parseInt(e)),
                    a = parseInt(s.Level_Type),
                    n = s.Scene_ID,
                    o = parseInt(s.Attributes_Growth),
                    h = [],
                    r = parseInt(s.Base_Injury),
                    l = parseInt(s.Base_HP),
                    p = parseFloat(s.Injury_GrowthRate),
                    d = parseInt(s.Level_GoldAward),
                    c = parseFloat(s.EquipDrop_MGroupNum1),
                    u = parseInt(s.EquipDrop_MGroupGrade1),
                    m = parseFloat(s.EquipDrop_MGroupNum2),
                    g = parseInt(s.EquipDrop_MGroupGrade2),
                    _ = parseInt(s.Level_TotalGains),
                    f = parseInt(s.Normal_HP),
                    y = parseInt(s.Rare_HP),
                    S = parseInt(s.Boss_HP),
                    b = parseInt(s.Normal_dam),
                    I = parseInt(s.Rare_dam),
                    w = parseInt(s.Boss_dam),
                    L = parseInt(s.Oil_dam),
                    v = s.Boss_pre.split("_")[0],
                    C = new j(i, a, n, o, h, d, r, l, p, c, u, m, g, _, f, y, S, b, I, w, L, v);
                this.levelCustemInfo.push(C)
            }
        }
        getLevelEarnings() {
            let e = B.Instance.talents[0],
                t = C.Instance.getTalentConfig()[0][e].Talent_Value;
            return Math.floor(this.levelCustemInfo[this.level - 1].Level_GoldAward * t)
        }
        getAddGoldSpeedInfo() {
            let e = B.Instance.talents[2],
                t = B.Instance.talents[3];
            return e = C.Instance.getTalentConfig()[2][e].Talent_Value,
                [e = 60, t = C.Instance.getTalentConfig()[3][t].Talent_Value]
        }
        getLevelScene() {
            return this.levelCustemInfo[this.level - 1].Scene_ID
        }
        parseDropConfig(e) {
            this.dropConfigInfo = new Array;
            let t = e.DropConfig;
            for (let e = 0; e < t.length; e++) {
                const s = t[e];
                let i = parseInt(s.Drop_ID),
                    a = parseInt(s.Drop_Group),
                    n = parseInt(s.Drop_LimitLv),
                    o = parseInt(s.DropItem_Type),
                    h = parseInt(s.Item_ID),
                    r = parseInt(s.Drop_Num),
                    l = parseInt(s.Drop_Weight),
                    p = new K(i, a, n, o, h, r, l);
                this.dropConfigInfo.push(p)
            }
        }
        parseEquipDropConfig(e) {
            this.equipDropConfig = new Array;
            let t = e.EquipDropConfig;
            for (let e = 0; e < t.length; e++) {
                const s = t[e];
                let i = parseInt(s.EDrop_ID),
                    a = parseInt(s.Equip_Group),
                    n = parseInt(s.EquipItem_Type),
                    o = parseInt(s.Drop_Num),
                    h = parseInt(s.Drop_Weight),
                    r = new V(i, a, n, o, h);
                this.equipDropConfig.push(r)
            }
        }
        parseMonsterConfig(e) {
            let t = e.MonsterConfig;
            this.monsterConfigInfo = new Array;
            for (let e = 0; e < t.length; e++) {
                const s = t[e];
                let i = parseInt(s.Monster_ID),
                    a = s.Monster_Sprite,
                    n = parseInt(s.Monster_cloth.split("_")[1]),
                    o = parseInt(s.Monster_Helmet.split("_")[1]),
                    h = parseInt(s.Monster_Gun.split("_")[1]),
                    r = s.Drop_Group.split(",");
                r[0] = r[0].split("_").map(e => parseInt(e));
                let l = r[0],
                    p = parseInt(s.Monster_HP),
                    d = parseInt(s.Monster_DEF),
                    c = parseInt(s.Monster_DAM),
                    u = parseInt(s.Monster_Type),
                    m = parseInt(s.Monster_Class),
                    g = s.Monster_GunParameter.split("_").map(e => parseInt(e)),
                    _ = new W(i, a, n, o, h, l, p, d, c, g, u, m);
                this.monsterConfigInfo.push(_)
            }
        }
        getDropAtt(e, t = 1) {
            let s = [];
            this.monsterConfigInfo.forEach(t => {
                t.Monster_Sprite == e && (s = t.Drop_Group)
            });
            let i = [],
                a = 0;
            for (let e = 0; e < s.length; e++) {
                const t = s[e];
                let n = [],
                    o = [];
                for (let e = 0; e < t[2]; e++) {
                    if (1e4 * Math.random() < t[1])
                        if (o.length > 0) {
                            let e = Number.MAX_VALUE,
                                t = null;
                            for (let s = 0; s < o.length; s++)
                                o[s].Drop_ID < e && (e = o[s].Drop_ID, t = o[s]);
                            i[a] = [t.Item_ID, t.Drop_Num],
                                o.splice(o.indexOf(t), 1),
                                a++
                        } else {
                            if (!(n.length > 0))
                                return i; {
                                let e = 0;
                                n.forEach(t => {
                                    e += t.Drop_Weight
                                });
                                let t = Math.random() * e;
                                for (let e = 0; e < n.length; e++)
                                    if (n[e].Drop_Weight > t) {
                                        i[a] = [n[e].Item_ID, n[e].Drop_Num],
                                            a++,
                                            n.splice(e, 1);
                                        break
                                    }
                            }
                        }
                }
            }
            return i
        }
        getEnemyAddNum(e) {
            for (let t = 0; t < this.equipDropConfig.length; t++) {
                const s = this.equipDropConfig[t];
                if (s.EDrop_ID == e && s.Drop_Weight > 100 * Math.random())
                    return [s.EquipItem_Type, s.Drop_Num]
            }
            return []
        }
        getEnemyGrop(e) {
            let t = [];
            this.monsterConfigInfo.forEach(s => {
                s.Monster_Sprite == e && t.push(s.Drop_Group)
            });
            let s = [];
            if (0 == t.length || 0 == t[0])
                return [];
            for (let e = 0; e < t[0].length; e++) {
                const i = t[0][e];
                s[e] = [];
                for (let t = 0; t < this.equipDropConfig.length; t++) {
                    const a = this.equipDropConfig[t];
                    a.Equip_Group == i && a.Drop_Weight > 100 * Math.random() && s[e].push([a.EquipItem_Type, a.Drop_Num])
                }
            }
            return s
        }
        getLevelGold() {
            let e = .8 + .4 * Math.random();
            return () => this.levelCustemInfo[this.level - 1].Level_TotalGains * e
        }
        getMonsterGoldNum() {
            return this.globalConfigInfo.Monster_GoldNum
        }
        getMonsterType(e) {
            for (let t = 0; t < this.monsterConfigInfo.length; t++) {
                const s = this.monsterConfigInfo[t];
                if (s.Monster_Sprite == e)
                    return s.Monster_Type
            }
            return 0
        }
        getTreasureOpenWeaponNum(e) {
            return this.globalConfigInfo[this.treasureType[e]]
        }
        getGoldEarningSecond() {
            let e = this.getLevelEarnings();
            this.globalConfigInfo.SafeBox_GoldK;
            return this.globalConfigInfo.SafeBox_GoldK * e
        }
        getEnemyDropWeigth() {
            let e = 0;
            for (let t = 0; t < this.enemyArray.length; t++) {
                const s = this.enemyArray[t];
                this.monsterConfigInfo.forEach(t => {
                    t.Monster_Sprite == s.getName() && (e += t.Monster_Type)
                })
            }
            this.monster_count = e;
            let t = this.levelCustemInfo[this.level - 1].EquipDrop_MGroupGrade1,
                s = this.levelCustemInfo[this.level - 1].EquipDrop_MGroupGrade2,
                i = this.levelCustemInfo[this.level - 1].EquipDrop_MGroupNum1,
                a = this.levelCustemInfo[this.level - 1].EquipDrop_MGroupNum2;
            return [[i / e, t], [a / e, s]]
        }
        getSkillInfo(e, t = !1) {
            if (null !== this.all_skill_att[e] && void 0 !== this.all_skill_att[e] && !t)
                return this.all_skill_att[e];
            (!this.skillsData[e] || this.skillsData[e] <= 0) && (this.skillsData[e] = 1),
            this.propConfigInfo || (this.propConfigInfo = C.Instance.getSkillConfig());
            let s = this.propConfigInfo[e][this.skillsData[e] - 1],
                i = 0;
            i = s[4],
                i = Math.ceil(i);
            let a = this.propConfigInfo[e][this.skillsData[e] - 1][5];
            return 1 == e && (s[6] = this.propConfigInfo[e][0][6]),
                this.all_skill_att[e] = [i, a, s[6]],
                this.all_skill_att[e]
        }
        getMonsterObj(e) {
            for (let t = 0; t < this.monsterConfigInfo.length; t++) {
                const s = this.monsterConfigInfo[t];
                if (s.Monster_Sprite == e)
                    return s
            }
        }
        judgeBossLevel() {
            return parseInt(this.getLevelScene().split("_")[1]) > 150
        }
    }
    class Q extends A {
        constructor() {
            super(...arguments),
                this.isOpen = !1,
                this.dieAnimInterval = 0
        }
        onAwake() {
            super.onAwake(),
                this.humanClass = -1,
                this.fingerFirstType = c.FirstPlayer.RUG_BOSS,
            this.enemyTemp || (this.enemyTemp = new Laya.Templet, this.enemyTemp.loadAni(s.REQUIRE_SK_URL + "enemy_sp/Rug_boss_target.sk"), this.enemyTemp.on(Laya.Event.COMPLETE, this, this.weaknessLoadSuccess))
        }
        initHumanAtt() {
            this.hurtEffType = 1,
                this.enemyOutDis = -1,
                this.hurtIconPosX = 50,
                this.hurtIconPosY = -36,
                this.hpBar.visible = !1
        }
        init(e) {
            this.fullHp = e,
                this.hp = e,
                this.isDie = !1
        }
        openWeakness() {
            this.enemy.play("open", !1),
                this.hp = this.fullHp,
                this.hpBar.value = 1,
                this.isOpen = !0,
                this.isDie = !1,
                this.hpBar.visible = !0,
            B.Instance.firstPlayerType[c.FirstPlayer.RUG_BOSS] || (this.fingerSK ? this.fingerSK.visible = !0 : (this.fingerSK = Le.Instance.addFirstFinger(), this.fingerSK.pos(this.getSite().x, this.getSite().y), u.Language == r.CN ? this.fingerSK.play(0, !0) : this.fingerSK.play(1, !0))),
                this.owner.on(Laya.Event.CLICK, this, this.touchAtkSelf)
        }
        closeWeakness() {
            this.enemy && (this.fingerSK && (this.fingerSK.visible = !1), this.owner.off(Laya.Event.CLICK, this, this.touchAtkSelf), this.hpBar.visible = !1, this.isOpen = !1, this.sk_func.visible = !1, this.enemy && this.enemy.play("hit", !1))
        }
        weaknessLoadSuccess() {
            this.dieAnimInterval = this.enemyTemp.getAniDuration(3),
                this.enemy = this.enemyTemp.buildArmature(0),
                this.owner.addChild(this.enemy),
                this.enemy.pos(50, 120),
                this.enemy.play("stay", !0)
        }
        getSite() {
            let e = this.owner.parent;
            return {
                x: e.x + this.humanSp.x + 50,
                y: e.y + this.humanSp.y + 100
            }
        }
        initFirstFinger() {}
        atkTarget() {}
        specialDie() {
            this.enemy.play("dead", !1),
                _.Dispatch(g.BossWeaknessDead),
                Laya.timer.once(this.dieAnimInterval, this, () => {
                    this.closeWeakness()
                })
        }
        set PlayerSite(e) {
            let t = this.owner.parent;
            this.playerSite = e;
            let s = Math.abs(this.playerSite.x - (t.x + this.humanSp.x)),
                i = Math.abs(this.playerSite.y - (t.y + this.humanSp.y));
            this.hurtEffGapRota = 180 * -Math.atan(i / s) / Math.PI,
                this.hurtEffGapRota %= 90,
                n.l("当前的角度 === " + this.hurtEffGapRota)
        }
        hurtEff() {
            this.sk_func.visible || (this.sk_func.visible = !0);
            let e = this.owner.parent;
            this.enemy.play("hit", !1),
                m.Instance.addATKEffSK(Le.Instance.getEffGroup(), e.x + this.humanSp.x + 50, e.y + this.humanSp.y + 100, !1, this.hurtEffGapRota),
                this.hpBar.skin = "battle/hp_enemy_eff.png",
                Laya.timer.once(200, this, () => {
                    this.hpBar.skin = "battle/hp_enemy.png"
                })
        }
        weaknessHide() {
            this.humanSp.removeSelf()
        }
        onDisable() {
            Laya.timer.clearAll(this),
            this.fingerSK && (this.fingerSK.removeSelf(), this.fingerSK.destroy(!0), this.fingerSK = null),
                this.enemy.removeSelf(),
                this.enemy = null,
                this.enemyTemp = null
        }
    }
    class z extends y {
        constructor() {
            super(...arguments),
                this.changeAtkTargeting = !1,
                this.shootFlag = !0,
                this.count_shake = 0,
                this.shake_flag = !0,
                this.move_start_over = !1
        }
        onAwake() {
            super.onAwake(),
                _.AddListener(g.ExitGame, this, this.clearPlayer),
                this.shootFlag = !0,
                this.curr_direction = 1,
                this.move_speed = X.Instance.getGlobalConfigInfo().MoveSpeed,
                this.tempComplete()
        }
        hpFullState() {
            this.hpBar.value = 1
        }
        tempComplete() {
            let e = m.Instance;
            this.playerAnimUp = e.playerTemp.buildArmature(1),
                this.playerAnimDown = e.playerTemp.buildArmature(1),
                this.owner.addChild(this.playerAnimUp),
                this.owner.addChild(this.playerAnimDown),
                this.playerAnimUp.play("fire_body_1", !1),
                this.playerAnimDown.play("stand_leg", !0),
                this.playerAnimDown.zOrder = 2,
                this.playerAnimUp.zOrder = 2,
                _.Dispatch(g.InitPlayer, this)
        }
        changePlayerSkin(e, t, s, i) {
            this.gun_type = C.Instance.getItemConfig()[0][t].Gun_Type,
                this.playerAnimDown.replaceSlotSkinByIndex("head", 0, e),
                this.playerAnimDown.replaceSlotSkinByIndex("gun", 0, t),
                this.playerAnimDown.replaceSlotSkinByIndex("cloth_out", 0, s),
                this.playerAnimDown.replaceSlotSkinByIndex("cloth", 0, i),
                this.playerAnimUp.replaceSlotSkinByIndex("head", 0, e),
                this.playerAnimUp.replaceSlotSkinByIndex("gun", 0, t),
                this.playerAnimUp.replaceSlotSkinByIndex("gun_fire", 0, t),
                this.playerAnimUp.replaceSlotSkinByIndex("cloth_out", 0, i),
                this.playerAnimUp.replaceSlotSkinByIndex("cloth", 0, s),
                this.move_start_over = !1
        }
        onEnable() {
            _.AddListener(g.ReplaceSkin, this, this.changePlayerSkin),
                _.AddListener(g.HPFullState, this, this.hpFullState),
                _.AddListener(g.ChangePlayerAtkTarget, this, this.changeAtkTarget),
                this.hpBar.value = 1,
                this.moveFlag = !1,
                this.humanSp.x = -100
        }
        resetInfo() {
            this.hpBar.visible = !0
        }
        subHp(e, t) {
            super.subHp(e, 0)
        }
        hurt(e) {
            this.hpBar.value = this.hp / this.fullHp
        }
        hurtEff() {
            super.hurtEff(),
            this.shootFlag && (this.shake_flag && (this.shake_flag = !1, Laya.Tween.to(this.humanSp, {
                x: this.humanSp.x - 5
            }, 50, null, Laya.Handler.create(this, () => {
                this.count_shake++,
                    Laya.Tween.to(this.humanSp, {
                        x: this.humanSp.x + 5
                    }, 50, null, Laya.Handler.create(this, () => {
                        this.count_shake--,
                        this.count_shake <= 0 && (this.shake_flag = !0)
                    }))
            }))), this.hurtHpUI())
        }
        hurtHpUI() {
            let e = this.humanSp.x - Le.Instance.level_curr_len;
            m.Instance.addBloodSKEff(Le.Instance.getEffGroup(), e, this.humanSp.y, -1),
                this.hpBar.skin = "battle/hp_hero_eff.png",
                Laya.timer.once(200, this, () => {
                    this.hpBar.skin = "battle/hp_hero.png"
                })
        }
        die() {
            super.die(),
                this.playerAnimDown.play("walk_full", !0),
                this.playerAnimUp.removeSelf();
            let e = Laya.Tween.to(this.humanSp, {
                x: -100
            }, 1e3, null, Laya.Handler.create(this, () => {
                o.playSceneSound("result_popp"),
                    X.Instance.loseGame()
            }));
            X.Instance.pushTween(e)
        }
        atkTarget(t) {
            if (!this.shootFlag)
                return;
            if (_.Dispatch(g.ShootAnim), Laya.timer.clearAll(this), this.changeAtkTargeting = !0, !t)
                return;
            t.addHurtIcon();
            let s = this.humanSp.y - t.getSite().y,
                i = 0;
            if (i = s > 450 ? 4 : s > 350 ? 3 : s > 150 ? 2 : 1, e.l("当前的方向" + i), i == this.curr_direction)
                this.moveShootDirectionOver(t);
            else {
                this.playerAnimUp.play("fire_body_" + this.curr_direction + "to" + i, !1),
                    this.curr_direction = i;
                let e = m.Instance.getPlayerShootDirectionChangeTime();
                Laya.timer.once(e, this, this.moveShootDirectionOver, [t])
            }
        }
        moveShootDirectionOver(e) {
            this.shootFlag && (this.playerAnimDown.play("stand_leg", !1), this.atkHuman = e, this.moveFlag = !1, super.atkTarget(e), this.changeAtkTargeting = !1)
        }
        get ChangeAtkTargeting() {
            return this.changeAtkTargeting
        }
        shootAnim() {
            super.shootAnim(),
                e.e("当前射击的次数:  +++++   1");
            let t = 20;
            _.Dispatch(g.ChangeATKTarget),
            "bomb" == this.atk_huamn_name && (t = 0),
                Le.Instance.shoot_dir.x = this.atkHuman.getSite().x - t,
                this.playerAnimUp.play("fire_body_" + this.curr_direction, !1),
                e.e("当前射击的次数:  +++++  2")
        }
        move() {
            null === this.playerAnimDown || void 0 === this.playerAnimDown || this.moveFlag || (this.playerAnimDown.play("walk_leg", !0), this.moveFlag = !0),
            this.humanSp.x < 100 && (this.humanSp.x += this.move_speed, this.humanSp.x >= 50 && !this.move_start_over && (this.move_start_over = !0))
        }
        resultMove() {
            this.humanSp.x += this.move_speed,
            this.humanSp.x > 850 && (o.playSceneSound("result_popp"), X.Instance.winGame())
        }
        changeAtkTarget(t) {
            if (e.l("清理目标: --"), Laya.timer.clearAll(this), t[0]instanceof U) {
                let e = t[0],
                    s = {};
                s.x = this.humanSp.x - Le.Instance.level_curr_len,
                    s.y = this.humanSp.y,
                    e.PlayerSite = s
            }
            if (t[0]instanceof Q) {
                let e = t[0],
                    s = {};
                s.x = this.humanSp.x - Le.Instance.level_curr_len,
                    s.y = this.humanSp.y,
                    e.PlayerSite = s
            }
            this.atkTarget(t[0])
        }
        onDisable() {
            super.onDisable(),
                _.RemoveListener(g.ReplaceSkin, this, this.changePlayerSkin),
                _.RemoveListener(g.HPFullState, this, this.hpFullState),
                _.RemoveListener(g.ChangePlayerAtkTarget, this, this.changeAtkTarget),
                this.playerAnimDown.removeSelf(),
                this.playerAnimDown.destroy(!0),
                this.playerAnimDown = null,
                this.playerAnimUp.removeSelf(),
                this.playerAnimUp.destroy(!0),
                this.playerAnimUp = null
        }
        clearPlayer() {
            Laya.timer.clearAll(this),
                this.shootFlag = !1
        }
    }
    var J,
        Z = Laya.Scene,
        $ = Laya.ClassUtils.regClass;
    !function (e) {
        class t extends Z {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                    this.loadScene("GameView")
            }
        }
        e.GameViewUI = t,
            $("ui.GameViewUI", t);
        class s extends Z {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                    this.loadScene("LoginScene")
            }
        }
        e.LoginSceneUI = s,
            $("ui.LoginSceneUI", s);
        class i extends Z {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                    this.loadScene("MainView")
            }
        }
        e.MainViewUI = i,
            $("ui.MainViewUI", i);
        class a extends Z {
            constructor() {
                super()
            }
            createChildren() {
                super.createChildren(),
                    this.loadScene("zhonggao")
            }
        }
        e.zhonggaoUI = a,
            $("ui.zhonggaoUI", a)
    }
    (J || (J = {}));
    class ee {
        static buttonEff(e, t, s, i = !1, a) {
            e.on(Laya.Event.MOUSE_DOWN, e, () => {
                i || o.playSceneSound("button"),
                ee.flag && Laya.Tween.to(e, {
                    scaleX: .9,
                    scaleY: .9
                }, 100, null)
            }),
                e.on(Laya.Event.MOUSE_UP, e, () => {
                    ee.flag = !1,
                        Laya.Tween.to(e, {
                            scaleX: 1,
                            scaleY: 1
                        }, 70, null, Laya.Handler.create(t, () => {
                            s.call(t, a),
                                ee.flag = !0
                        }))
                })
        }
    }
    ee.flag = !0;
    class te extends Laya.Script {
        onAwake() {
            this.spriteSelf = this.owner
        }
        onEnable() {
            this.spriteSelf.x = 623,
                this.spriteSelf.y = 560,
                this.spriteSelf.alpha = 1,
                this.targetY = this.spriteSelf.y - 200
        }
        showTip(e) {
            Laya.Tween.to(this.owner, {
                y: this.targetY,
                alpha: 0
            }, 1e3, null, Laya.Handler.create(this, () => {
                t.cycleObject("gold_eff", this.owner),
                    this.owner.removeSelf()
            }))
        }
    }
    class se {
        constructor() {
            this.hasSafeBox = !1,
                this.preY = 0,
                this.maxTime = 0,
                this.minTime = 0,
                this.safeFlag = !1,
                this.frame = 0
        }
        init() {
            if (_.AddListener(g.OpenTreasuere, this, this.showOpenTreasure), this.gameConfig = X.Instance.getGlobalConfigInfo(), 0 == this.gameConfig.SafeBox_Global)
                return;
            this.preY = se.siteY + 1300;
            let e = m.Instance.safeBoxTemp.buildArmature(0);
            this.safeBox = new Laya.Button,
                this.safeBox.size(140, 180),
                this.safeBox.pivot(70, 90),
                this.safeBox.zOrder = 4,
                this.safeBox.addChild(e),
                e.pos(70, 120),
                e.play(0, !0),
                this.safeBox.on(Laya.Event.CLICK, this, this.openSafeBox),
                this.maxTime = this.gameConfig.SafeBox_InTime[1],
                this.minTime = this.gameConfig.SafeBox_InTime[0],
                _.AddListener(g.SafeBoxShow, this, this.showSafeBox),
                _.AddListener(g.ReSafeBoxCreate, this, this.intervalSafeBox),
                _.AddListener(g.HideSafeBox, this, this.hideSafeBox),
                Laya.timer.frameLoop(3, this, this.onUpdate),
                this.getSafeBoxTimer()
        }
        showOpenTreasure() {
            Laya.timer.once(500, this, () => {
                _.Dispatch(g.AppendBox, "prefabs/Popp/OpenTreasurePopp.json")
            })
        }
        showSafeBox() {
            let e = Math.random();
            if (this.gameConfig.SafeBox_Trigger < e)
                return void this.intervalSafeBox();
            se.parent.addChild(this.safeBox);
            let t = 400 * Math.random();
            this.safeBox.pos(se.siteX + t + 150, se.siteY - 100),
                this.hasSafeBox = !0
        }
        onUpdate() {
            this.hasSafeBox && (this.safeBox.y += 5, this.safeBox.y > this.preY && (this.safeBox.removeSelf(), this.hasSafeBox = !1, this.intervalSafeBox()))
        }
        openSafeBox() {
            this.safeBox.removeSelf(),
                this.hasSafeBox = !1,
                X.Instance.PauseGame = !0,
                _.Dispatch(g.AppendBox, "prefabs/Popp/ShopTreasurePopp.json")
        }
        getSafeBoxTimer() {
            0 == this.gameConfig.SafeBox_Global ? this.safeFlag = !1 : this.safeFlag = !0,
                this.intervalSafeBox()
        }
        intervalSafeBox() {
            if (Laya.timer.clear(this, this.showSafeBox), !this.safeFlag || B.Instance.treasureFullArr.length > 0 || se.safeBoxPoppExist)
                return;
            let e = 1e3 * (Math.random() * (this.maxTime - this.minTime) + this.minTime);
            Laya.timer.once(e, this, this.showSafeBox)
        }
        hideSafeBox() {
            this.safeBox.removeSelf(),
                this.hasSafeBox = !1
        }
    }
    se.safeBoxPoppExist = !1,
        se.siteX = 0,
        se.siteY = 0;
    var ie = c.GlobalConfig,
        ae = c.ShareCount,
        ne = c.FunctionConfig;
    class oe {
        constructor() {
            this.initOver = !1
        }
        static get Instance() {
            return null == oe._instance && (oe._instance = new oe),
                oe._instance
        }
        init(e, t, s) {
            this.parseFunctionConfig(t),
                this.parseGlobalConfig(e),
                this.parseShareCount(s),
                X.Instance.initCDNConfig(this.globalConfig, this.functionConfigInfo, this.shareCountInfo),
                this.initOver = !0
        }
        getShareInfo() {
            return this.globalConfig ? [this.globalConfig.sharepicture_title, this.globalConfig.sharepicture_url, this.globalConfig.sharepicture_num] : null
        }
        getShareTimer(e) {
            let t = 0;
            switch (e) {
                case "Double_income":
                    t = 0;
                    break;
                case "SafeBox":
                    t = 1;
                    break;
                case "Refection":
                    t = 2;
                    break;
                case "Gift":
                    t = 3;
                    break;
                case "Gold":
                    t = 4;
                    break;
                case "Qiandao":
                    t = 5;
                    break;
                case "Jiesuan":
                    t = 6;
                    break;
                case "Offinle_income":
                    t = 7
            }
            let s = B.Instance.shared_video_day_count[t],
                i = this.functionConfigInfo[t].Function_Parameters.length;
            return this.functionConfigInfo[t].Function_Parameters[(s - 1) % i][1] / 1e3
        }
        get MinShareTime() {
            return this.globalConfig ? this.globalConfig.ReturnTime_Fixed : 1
        }
        get MaxShareCount() {
            return console.log(this.shareCountInfo),
                console.log("当前的最大的分享次数： ------------------ " + this.shareCountInfo[this.shareCountInfo.length - 1].Share_Count),
                this.shareCountInfo[this.shareCountInfo.length - 1].Share_Count
        }
        getShareRate(e) {
            return this.shareCountInfo ? this.shareCountInfo[e].Count_SR / 1e4 : .8
        }
        get BannerTime() {
            return this.initOver && null != this.globalConfig ? [this.globalConfig.MainBanner_FreshTime, this.globalConfig.FightBanner_FreshTime, this.globalConfig.SEBanner_FreshTime] : (console.error("config not init over or global config is Undefined"), [60, 45, 60])
        }
        get InterstitialTime() {
            return this.initOver && null != this.globalConfig ? this.globalConfig.IntersitialFresh_Time : 200
        }
        getVideoRate(e, t) {
            return this.initOver && this.shareCountInfo,
                0
        }
        enableShare() {
            return !(!this.initOver || null == this.globalConfig) && this.globalConfig.ShareGlobal_Check
        }
        parseGlobalConfig(e) {
            let t = e.GlobalConfig[0],
                s = t.sharepicture_url,
                i = parseInt(t.ReturnTime_Fixed),
                a = parseInt(t.ShareGlobal_Check),
                n = parseInt(t.IntersitialFresh_Time),
                o = parseInt(t.Banner_MisGuide),
                h = parseInt(t.BannerFresh_Time),
                r = t.sharepicture_num,
                l = parseInt(t.BuyRank_Max),
                p = parseInt(t.BuyRank_Min),
                d = parseInt(t.SBoxRank_Max),
                c = parseInt(t.SBoxRank_Min),
                u = parseInt(t.DailyData_ResetTime),
                m = t.sharepicture_title,
                g = t.Monster_GoldNum.split("_").map(e => parseInt(e)),
                _ = t.SafeBox_FreeNum.split("_").map(e => parseInt(e)),
                f = t.SafeBox_VideoNum.split("_").map(e => parseInt(e)),
                y = t.SafeBox_ShareNum.split("_").map(e => parseInt(e)),
                S = t.Version,
                b = parseInt(t.LevelRank_Max),
                I = parseInt(t.LevelRank_Min),
                w = parseInt(t.SafeBox_GoldK),
                L = parseInt(t.Gold_add),
                v = parseInt(t.Injury_BasicValue),
                C = parseInt(t.MoveSpeed),
                T = parseFloat(t.Injury_GrowthRate),
                k = parseFloat(t.straightup_probability),
                x = parseFloat(t.bannerWidthPercentage),
                B = parseInt(t.straightup_level),
                E = parseInt(t.SafeBox_Global),
                A = t.SafeBox_InTime.split("_").map(e => parseInt(e)),
                D = parseFloat(t.SafeBox_Trigger),
                R = parseInt(t.MainBanner_FreshTime),
                G = parseInt(t.FightBanner_FreshTime),
                P = parseInt(t.SEBanner_FreshTime),
                M = parseInt(t.Madness_Chance),
                N = parseInt(t.Madness_DPSUp),
                O = parseInt(t.Madness_AKTime),
                U = parseInt(t.Madness_HPReduce),
                F = parseFloat(t.InjuryK_Fly),
                H = parseFloat(t.Extract_Fly),
                K = parseInt(t.FlyMan_BombTime),
                j = parseFloat(t.InjuryK_DeadMan),
                W = parseFloat(t.Extract_DeadMan),
                V = parseInt(t.BossSK_BlasterTime),
                Y = parseInt(t.BossSK_RebelTime),
                q = parseInt(t.BossSK_RebelNum),
                X = parseInt(t.BossSK_RugTime),
                Q = parseFloat(t.BossSK_RugHP),
                z = parseInt(t.BossSK_BunkerTime),
                J = parseFloat(t.BossSK_LancerHP),
                Z = parseInt(t.mistake_banner),
                $ = parseInt(t.boss_HPSum),
                ee = parseInt(t.Oildam_Range);
            this.globalConfig = new ie(S, a, i, n, o, h, s, r, m, l, p, b, I, d, c, g, _, f, y, u, v, T, C, w, L, k, x, B, E, A, D, R, G, P, M, N, O, U, F, H, K, j, W, V, Y, q, X, Q, z, J, $, ee, Z),
                console.log("解析后的数据 : ", this.globalConfig)
        }
        parseShareCount(e) {
            let t = e.ShareCount;
            this.shareCountInfo = new Array;
            for (let e = 0; e < t.length; e++) {
                const s = t[e];
                let i = parseInt(s.ID),
                    a = parseInt(s.Share_Count),
                    n = parseInt(s.Count_SR),
                    o = new ae(i, a, n);
                this.shareCountInfo.push(o)
            }
            console.log("分享的json ： ", this.shareCountInfo)
        }
        getGlobalConfigInfo() {
            return this.globalConfig
        }
        parseFunctionConfig(e) {
            this.functionConfigInfo = [];
            let t = e.FunctionConfig;
            for (let e = 0; e < t.length; e++) {
                const s = t[e];
                let i = parseInt(s.ID),
                    a = s.Function_Name,
                    n = s.Function_Parameters.split(",");
                n = n.map(e => e.split("_"));
                for (let e = 0; e < n.length; e++)
                    for (let t = 0; t < n[e].length; t++)
                        n[e][t] = parseInt(n[e][t]);
                let o = parseInt(s.Is_loop),
                    h = parseInt(s.Count),
                    r = parseInt(s.Daily_Reset),
                    l = new ne(i, a, n, o, h, r);
                this.functionConfigInfo.push(l)
            }
            console.log("function的json ： ", this.functionConfigInfo)
        }
    }
    class he {
        constructor() {
            this.adID = "0a980134fe6d19975aff7fcefdaa62ee",
                this.adIndex = 0,
                this.addEventListener()
        }
        init() {
            if (!Laya.Browser.onQQMiniGame)
                return;
            let e = Laya.Browser.window.qq;
            this.videoAD = e.createRewardedVideoAd({
                adUnitId: this.adID
            }),
                this.videoAD.onLoad(e => {
                    this.videReadys = !0
                }),
                this.videoAD.onError(e => {
                    this.videReadys = !1
                }),
                this.videoAD.onClose(e => {
                    let t = !1;
                    (e && e.isEnded || void 0 === e) && (t = !0),
                        this.videReadys = !1,
                        _.Dispatch(g.VideoADResult, this.buttonID, t)
                })
        }
        addEventListener() {
            _.AddListener(g.PlayVideoAD, this, this.onPlayVideoAD),
                _.AddListener(g.InitVideoAD, this, this.init)
        }
        removeEventListener() {
            _.RemoveListener(g.PlayVideoAD, this, this.onPlayVideoAD),
                _.RemoveListener(g.InitVideoAD, this, this.init)
        }
        show() {
            console.error("播放广告,当前广告的index == " + this.adIndex),
                this.videoAD.show().catch(() => {
                    this.videoAD.load().then(() => this.videoAD.show()).catch(e => {
                        _.Dispatch(g.NoAdOrShareReady)
                    })
                })
        }
        load() {
            this.videoAD.load()
        }
        isReady() {
            return this.videReadys
        }
        onClosed(e) {
            let t = !1;
            (e && e.isEnded || void 0 === e) && (t = !0),
                this.videReadys = !1,
                _.Dispatch(g.VideoADResult, this.buttonID, t)
        }
        onPlayVideoAD(e) {
            this.buttonID = e[0],
                this.adIndex = e[1],
                this.adIndex = this.adIndex % this.videoAD.length,
                this.show()
        }
        clear() {
            this.removeEventListener()
        }
        hide() {}
        destroy() {}
        onReward() {}
    }
    class re {
        constructor() {
            this.minBannerWidth = 300,
                this.bannerHeight = 73,
                this.playIndex = 0,
                this.mistakeBannerFlag = !1,
                this.bannerIDs = ["2310df5b2199490be23fd3e4fa06c1a4", "97854a12bb5f160bb0c7be8e1f308baf"],
                this.addEventListener(),
                this.mistakeBannerFlag = 1 == X.Instance.getGlobalConfigInfo().mistake_banner,
                this.bannerWidthPercentage = X.Instance.getGlobalConfigInfo().bannerWidthPercentage
        }
        addEventListener() {
            _.AddListener(g.InitBannerAD, this, this.init),
                _.AddListener(g.ShowBannerAD, this, this.show)
        }
        removeEventListener() {
            _.RemoveListener(g.InitBannerAD, this, this.init),
                _.RemoveListener(g.ShowBannerAD, this, this.show)
        }
        init() {
            if (!Laya.Browser.onQQMiniGame)
                return void this.removeEventListener();
            this.qq = Laya.Browser.window.qq;
            let e = 0;
            if (this.bannerIDs && (e = this.bannerIDs.length), !(e < 1)) {
                this.bannerArr = new Array(e),
                    this.bannerRefreshDuration = oe.Instance.BannerTime,
                    this.systemInfo = this.qq.getSystemInfoSync();
                for (let t = 0; t < e; ++t)
                    this.bannerArr[t] = this.createBanner(t)
            }
        }
        createBanner(e) {
            let t = this.qq.createBannerAd({
                adUnitId: this.bannerIDs[e],
                adIntervals: this.bannerRefreshDuration[e],
                style: {
                    left: (this.systemInfo.windowWidth - this.minBannerWidth) / 2,
                    top: this.systemInfo.windowHeight - this.bannerHeight,
                    width: this.minBannerWidth,
                    height: this.bannerHeight
                }
            });
            return t.onLoad(e => {}),
                t.onError(e => {}),
                t.onResize(e => {
                    this.onResize(t, e),
                        t.show()
                }),
                t
        }
        show(e) {
            this.mistakeBannerFlag ? this.playIndex != e[0] && (this.bannerArr[this.playIndex].hide(), this.playIndex = e[0], this.bannerArr[this.playIndex].show()) : this.bannerArr[0].show()
        }
        onResize(e, t) {
            e.style.top = this.systemInfo.windowHeight - t.height + .1,
                e.style.left = (this.systemInfo.windowWidth - t.width) / 2 + .1;
            let i = s.BG_HEIGHT / this.systemInfo.windowHeight;
            s.BANNER_HEIGHT = t.height * i
        }
        hide() {
            if (!this.mistakeBannerFlag)
                return _.RemoveListener(g.ShowBannerAD, this, this.show);
            this.bannerArr[0].hide(),
                this.bannerArr[1].hide(),
                Laya.timer.once(1e3, this, () => {
                    this.show([1])
                })
        }
        destroy() {
            for (let e = 0, t = this.bannerArr.length; e < t; ++e)
                this.bannerArr[e].destroy();
            this.bannerArr = null,
                this.bannerIDs = null,
                this.playIndex = 0
        }
        clear() {
            this.destroy()
        }
    }
    class le {
        constructor() {
            this.adID = "48e6a53e2bcc6f1cb52356b65c44d131",
                this.addEventListener()
        }
        init() {
            Laya.Browser.onQQMiniGame && (this.qq = Laya.Browser.window.qq, this.qqSDKVersion = this.qq.getSystemInfoSync().SDKVersion, this.compareVersion(this.qqSDKVersion, "1.7.1") >= 0 && (this.appbox = this.qq.createAppBox({
                adUnitId: this.adID
            })))
        }
        compareVersion(e, t) {
            let s = e.split("."),
                i = t.split(".");
            const a = Math.max(s.length, i.length);
            for (; s.length < a; )
                s.push("0");
            for (; i.length < a; )
                i.push("0");
            for (let e = 0; e < a; e++) {
                const t = parseInt(s[e]),
                    a = parseInt(i[e]);
                if (t > a)
                    return 1;
                if (t < a)
                    return -1
            }
            return 0
        }
        load() {}
        destroy() {
            this.appbox.destroy()
        }
        addEventListener() {
            _.AddListener(g.InitAppbox, this, this.init),
                _.AddListener(g.PlayAppbox, this, this.load)
        }
        removeEventListener() {
            _.RemoveListener(g.InitAppbox, this, this.init),
                _.RemoveListener(g.InitAppbox, this, this.load)
        }
        clear() {
            this.removeEventListener()
        }
    }
    class pe {
        constructor() {
            this.shareInfo = [],
                this.shareUTC = 0,
                this.costTime = 0,
                this.shareCount = 0,
            Laya.Browser.onQQMiniGame && (this.qq = Laya.Browser.window.qq, this.maxShareCount = oe.Instance.MaxShareCount, this.passiveShare(), this.qq.onShow(e => {
                _.Dispatch(g.OnShow);
                let t = new Date;
                this.costTime = (t.getTime() - this.shareUTC) / 1e3,
                    this.shareUTC = 0,
                    this.calculateShareResult()
            }), this.qq.onHide(() => {
                _.Dispatch(g.OnHide),
                    _.Dispatch(g.SaveGameData),
                this.callShare && (this.shareUTC = (new Date).getTime(), this.shareCount++, this.shareCount = this.shareCount > this.maxShareCount ? this.maxShareCount : this.shareCount, this.callShare = !1)
            }), this.shareInfo = oe.Instance.getShareInfo(), this.addEventListener())
        }
        calculateShareResult() {
            let e = !0;
            if (this.minShareTime = oe.Instance.getShareTimer(this.buttonID), this.costTime < this.minShareTime)
                e = !1;
            else {
                oe.Instance.getShareRate(this.shareCount - 1) <= Math.random() && (e = !1)
            }
            _.Dispatch(g.ShareResult, this.buttonID, e)
        }
        passiveShare() {
            this.minShareTime = oe.Instance.MinShareTime,
                this.qq.showShareMenu({
                    withShareTicket: !1
                }),
                this.shareInfo ? this.qq.onShareAppMessage(() => ({
                    title: this.shareInfo[0],
                    imageUrlId: this.shareInfo[2],
                    imageUrl: this.shareInfo[1]
                })) : this.qq.onShareAppMessage(() => ({
                    title: this.defaultTitle,
                    imageUrl: this.defaultImageUrl,
                    imageUrlId: this.defaultImageCode
                }))
        }
        initiativeShare() {
            this.callShare = !0,
                this.qq.shareAppMessage({
                    title: this.shareInfo[0],
                    imageUrlId: this.shareInfo[2],
                    imageUrl: this.shareInfo[1]
                }),
                this.qq.onShareAppMessage(() => ({
                    imageUrlId: this.shareInfo[2],
                    imageUrl: this.shareInfo[1]
                }))
        }
        clear() {}
        onTriggerShare(e) {
            this.buttonID = e[0],
                this.initiativeShare()
        }
        addEventListener() {
            _.AddListener(g.TriggerShare, this, this.onTriggerShare),
                _.AddListener(g.ScreenShare, this, this.ScreenShareFuc)
        }
        removeEventListener() {
            _.RemoveListener(g.TriggerShare, this, this.onTriggerShare),
                _.RemoveListener(g.ScreenShare, this, this.ScreenShareFuc)
        }
        ScreenShareFuc() {
            Laya.Browser.window.canvas.toTempFilePath({
                x: 10,
                y: 10,
                width: 750,
                height: 1334,
                destWidth: 400,
                destHeight: 300,
                success: e => {
                    this.qq.shareAppMessage({
                        imageUrl: e.tempFilePath
                    })
                }
            })
        }
    }
    var de = c.GameButtonName;
    class ce {
        constructor() {
            this.runTime = Laya.Browser.window.qq
        }
        btnPressed(e) {
            switch (e) {
                case de.RESULT_HEALP_BTN:
                    console.log("阿拉丁统计：点击帮助按钮"),
                    this.runTime && this.runTime.aldSendEvent("帮助按钮");
                    break;
                case de.RESULT_NEXT_BTN:
                    console.log("阿拉丁统计：点击下一关按钮"),
                    this.runTime && this.runTime.aldSendEvent("下一关按钮");
                    break;
                case de.RESULT_BACK_BTN:
                    console.log("阿拉丁统计：点击返回主界面"),
                    this.runTime && this.runTime.aldSendEvent("返回主界面");
                    break;
                case de.OFF_LINE_COMMON_BTN:
                    console.log("阿拉丁统计：点击离线领取按钮"),
                    this.runTime && this.runTime.aldSendEvent("离线领取按钮");
                    break;
                case de.OFF_LINE_SUPER_BTN:
                    console.log("阿拉丁统计：点击离线双倍领取按钮"),
                    this.runTime && this.runTime.aldSendEvent("离线双倍领取按钮");
                    break;
                case de.POWER_GET_BTN:
                    console.log("阿拉丁统计：点击免费获取体力"),
                    this.runTime && this.runTime.aldSendEvent("免费获取体力");
                    break;
                case de.POWER_CLOSE_BTN:
                    console.log("阿拉丁统计：点击关闭体力领取界面按钮"),
                    this.runTime && this.runTime.aldSendEvent("关闭体力领取界面");
                    break;
                case de.KNASPACE_RECOVER_BTN:
                    console.log("阿拉丁统计：点击卖出装备按钮"),
                    this.runTime && this.runTime.aldSendEvent("卖出装备按钮");
                    break;
                case de.KNASPACE_WEAPON_SHOP_BTN:
                    console.log("阿拉丁统计：点击购买枪械"),
                    this.runTime && this.runTime.aldSendEvent("购买枪械");
                    break;
                case de.KNASPACE_HELMET_SHOP_BTN:
                    console.log("阿拉丁统计：点击购买头盔按钮"),
                    this.runTime && this.runTime.aldSendEvent("买头盔按钮");
                    break;
                case de.KNASPACE_CLOTH_SHOP_BTN:
                    console.log("阿拉丁统计：点击购买衣服按钮"),
                    this.runTime && this.runTime.aldSendEvent("购买衣服按钮");
                    break;
                case de.TREASURE_GET_BTN:
                    console.log("阿拉丁统计：点击获取保险箱"),
                    this.runTime && this.runTime.aldSendEvent("获取保险箱");
                    break;
                case de.TREASURE_CLOSE_BTN:
                    console.log("阿拉丁统计：点击关闭保险箱获取界面"),
                    this.runTime && this.runTime.aldSendEvent("关闭保险箱获取界面按钮");
                    break;
                case de.SIGN_COMMON_BTN:
                    console.log("阿拉丁统计：点击签到页面普通领取"),
                    this.runTime && this.runTime.aldSendEvent("签到页面普通领取按钮");
                    break;
                case de.SIGN_SUPER_BTN:
                    console.log("阿拉丁统计：点击签到界面双倍领取按钮"),
                    this.runTime && this.runTime.aldSendEvent("签到界面双倍领取按钮");
                    break;
                case de.GOLD_SPEED_BTN:
                    console.log("阿拉丁统计：点击金币加速按钮"),
                    this.runTime && this.runTime.aldSendEvent("金币加速按钮");
                    break;
                case de.GOLD_SPEDD_CLOSE_BTN:
                    console.log("阿拉丁统计：点击关闭双倍加速按钮"),
                    this.runTime && this.runTime.aldSendEvent("关闭双倍加速按钮");
                case de.SHARE_GOLD_BTN:
                    console.log("阿拉丁统计：点击获取金币按钮"),
                    this.runTime && this.runTime.aldSendEvent("获取金币按钮");
                    break;
                case de.SHARE_GOLD_CLOSE_BTN:
                    console.log("阿拉丁统计：点击获取金币关闭按钮"),
                    this.runTime && this.runTime.aldSendEvent("获取金币关闭按钮");
                    break;
                case de.GUN_COMPLEX:
                    console.log("阿拉丁统计：合成武器成功的统计"),
                    this.runTime && this.runTime.aldSendEvent("合成武器成功");
                    break;
                case de.HELMET_COMPLEX:
                    console.log("阿拉丁统计：合成头盔成功的统计"),
                    this.runTime && this.runTime.aldSendEvent("合成头盔成功");
                    break;
                case de.CLOTH_COMPLEX:
                    console.log("阿拉丁统计：合成衣服成功"),
                    this.runTime && this.runTime.aldSendEvent("合成衣服成功")
            }
        }
        levelSuccess(e) {
            console.log("阿拉丁统计：关卡成功   lv: " + e),
                this.LevelEnd(e, "complete")
        }
        levelFail(e) {
            console.log("阿拉丁统计：关卡失败   lv: " + e),
                this.LevelEnd(e, "fail")
        }
        crtLevel(e) {
            console.log("阿拉丁统计：当前关卡   lv: " + e),
            this.runTime && this.runTime.aldStage.onStart({
                stageId: e,
                stageName: "level" + e
            })
        }
        LevelEnd(e, t) {
            this.runTime && this.runTime.aldStage.onEnd({
                stageId: e,
                stageName: "level" + e,
                event: t
            })
        }
        addEventListener() {}
        removeEventListener() {}
        clear() {}
    }
    class ue {
        constructor() {
            this.statictics = new ce,
                this.AddListener()
        }
        AddListener() {
            this.statictics && (_.AddListener(g.ButtonCounnt, this, this.onButtonClicked), _.AddListener(g.LevelSuccess, this, this.onLevelSuccess), _.AddListener(g.LevelFailed, this, this.onLevelFailed), _.AddListener(g.CurrentLevel, this, this.onCurrentLevel), this.statictics.addEventListener())
        }
        onButtonClicked(e) {
            this.statictics.btnPressed(e[0])
        }
        onLevelSuccess(e) {
            this.statictics.levelSuccess(e[0])
        }
        onLevelFailed(e) {
            this.statictics.levelFail(e[0])
        }
        onCurrentLevel(e) {
            this.statictics.crtLevel(e[0])
        }
        clearListener() {
            this.statictics && (this.statictics.clear(), _.RemoveListener(g.ButtonClicked, this, this.onButtonClicked), _.RemoveListener(g.LevelSuccess, this, this.onLevelSuccess), _.RemoveListener(g.LevelFailed, this, this.onLevelFailed), _.RemoveListener(g.CurrentLevel, this, this.onCurrentLevel), this.statictics = null)
        }
    }
    class me {
        init() {
            return this.enableShare = oe.Instance.enableShare(),
                this.addEventListener(),
                this.bannerAdController = new re,
                this.AppBox = new le,
                this.videoAdController = new he,
                this.share = new pe,
                this.QQStatictics = new ue,
                Laya.Browser.window.qq
        }
        judgePlayVideoOrShare(e, t, i) {
            switch (t) {
                case s.BUTTON_TYPE_SHARE:
                    this.enableShare && this.share && _.Dispatch(g.TriggerShare, e);
                    break;
                case s.BUTTON_TYPE_VIDEO:
                    this.videoAdController && this.videoAdController.isReady() ? this.enableShare ? _.Dispatch(g.PlayVideoAD, e, i) : this.enableShare && this.share ? _.Dispatch(g.TriggerShare, e) : _.Dispatch(g.NoAdOrShareReady, e) : this.share && this.enableShare ? _.Dispatch(g.TriggerShare, e) : _.Dispatch(g.NoAdOrShareReady, e)
            }
        }
        addEventListener() {
            _.AddListener(g.ButtonClicked, this, this.onButtonClicked)
        }
        removeEventListener() {
            _.RemoveListener(g.ButtonClicked, this, this.onButtonClicked)
        }
        clear() {
            this.removeEventListener()
        }
        onButtonClicked(e) {
            this.judgePlayVideoOrShare(e[0], e[1], e[2])
        }
    }
    class ge {
        constructor() {
            this.initPlatform()
        }
        initPlatform() {
            this.platform = new me,
            this.platform && (this.runtime = this.platform.init())
        }
    }
    class _e {
        static loadNetWorkConfig(e = null, t = null, s = null) {
            this.loadCaller = e,
                this.progressCallback = t,
                this.completeCallback = s,
                Laya.loader.load([this.globalConfigPath, this.functionConfigPath, this.shareCountPath], Laya.Handler.create(this, this.loadConfigComplete, null, !0), Laya.Handler.create(this, this.loadProgress, null, !1))
        }
        static loadConfigComplete() {
            let e = Laya.loader.getRes(this.globalConfigPath);
            e = Laya.loader.getRes(this.functionConfigPath),
                e = Laya.loader.getRes(this.shareCountPath),
                oe.Instance.init(Laya.loader.getRes(this.globalConfigPath), Laya.loader.getRes(this.functionConfigPath), Laya.loader.getRes(this.shareCountPath)),
                Laya.loader.clearRes(this.functionConfigPath),
                Laya.loader.clearRes(this.globalConfigPath),
                Laya.loader.clearRes(this.shareCountPath),
                console.error("初始化平台数据 ----------------------------"),
                new ge,
                _.Dispatch(g.InitAppbox),
                _.Dispatch(g.InitBannerAD),
                _.Dispatch(g.InitVideoAD),
            this.completeCallback && (this.completeCallback(), this.loadCaller = null, this.progressCallback = null, this.completeCallback = null),
                B.Instance.init()
        }
        static loadProgress(e) {
            this.loadCaller && this.progressCallback && this.progressCallback.call(this.loadCaller, e)
        }
        static LoadNetSkeleton(e, t, i, a) {
            this.chaptersSk_Path = s.REQUIRE_SK_URL + e + ".sk",
                this.chaptersPNG_Path = s.REQUIRE_SK_URL + e + ".png",
                this.self_caller = t,
                this.progress_func = i,
                this.complete_func = a,
                this.loadNetSk()
        }
        static loadNetSk() {
            if (Laya.Browser.onMiniGame) {
                let e = Laya.MiniAdpter.getFileInfo(this.chaptersSk_Path),
                    t = Laya.MiniAdpter.getFileInfo(this.chaptersPNG_Path);
                B.Instance.versionChange ? (B.Instance.versionChange = !1, console.error("开始清理缓存"), this.clearLocalCache(), Laya.MiniAdpter.downLoadFile(this.chaptersSk_Path, "image", Laya.Handler.create(this, () => {
                    this.loadLocalSkeleton()
                }), null)) : !e && t ? (console.warn("开始加载龙骨"), Laya.MiniAdpter.downLoadFile(this.chaptersSk_Path, "image", Laya.Handler.create(this, () => {
                    this.loadLocalSkeleton()
                }), null)) : this.loadLocalSkeleton()
            } else
                this.loadLocalSkeleton()
        }
        static clearLocalCache() {
            Laya.MiniAdpter.removeAll()
        }
        static loadLocalSkeleton() {
            let e = [this.chaptersSk_Path, this.chaptersPNG_Path];
            console.log(e);
            if (e[0] == 'dragonbone/undefined.sk') {
                console.log("无效");
                return
            }
            Laya.loader.load(e, Laya.Handler.create(this, () => {
                let e = Laya.loader.getRes(this.chaptersPNG_Path),
                    t = Laya.loader.getRes(this.chaptersSk_Path);
                e && t ? this.SkelontonLoadFinish() : (Laya.Browser.onMiniGame && Laya.MiniAdpter.remove(this.chaptersSk_Path), Laya.loader.clearRes(this.chaptersPNG_Path), Laya.loader.clearRes(this.chaptersSk_Path), this.loadNetSk())
            }), Laya.Handler.create(this, this.LoadProgress, null, !1))
        }
        static LoadProgress(e) {
            this.progress_func && this.self_caller && this.progress_func.call(this.self_caller, e)
        }
        static SkelontonLoadFinish() {
            this.complete_func.call(this.self_caller)
        }
        static GetSkeleton(e, t) {
            let s = new Laya.Templet;
            s.on(Laya.Event.COMPLETE, this, this.parseComplete, [s]),
                s.parseData(Laya.Loader.getRes(t), Laya.Loader.getRes(e))
        }
        static parseComplete(e) {
            Laya.loader.clearRes(this.chaptersSk_Path),
                Laya.loader.clearRes(this.chaptersPNG_Path)
        }
        static reLoadFile(e, t, i, a) {
            let n = s.REQUIRE_SK_URL + e + ".sk",
                o = s.REQUIRE_SK_URL + e + ".png";
            if (this.clear_over = [!1, !1], Laya.Browser.onMiniGame) {
                let s = Laya.MiniAdpter.getFileInfo(n),
                    h = Laya.MiniAdpter.getFileInfo(o);
                if (s || h) {
                    if (this.count_down++, this.count_down > 10)
                        return void _.Dispatch(g.AppendTextTip, "请重检查网络后，重新启动游戏", 2e3);
                    Laya.MiniAdpter.remove(n, Laya.Handler.create(this, () => {
                        this.clear_over[0] = !0,
                        this.clear_over[1] && this.LoadNetSkeleton(e, t, i, a)
                    })),
                        Laya.MiniAdpter.remove(o, Laya.Handler.create(this, () => {
                            this.clear_over[1] = !0,
                            this.clear_over[0] && this.LoadNetSkeleton(e, t, i, a)
                        }))
                } else
                    this.LoadNetSkeleton(e, t, i, a)
            }
        }
    }
    _e.shareCountPath = s.NET_CONFIG_PATH + "ShareCount.json",
        _e.globalConfigPath = s.NET_CONFIG_PATH + "GlobalConfig.json",
        _e.functionConfigPath = s.NET_CONFIG_PATH + "FunctionConfig.json",
        _e.chaptersSk_Path = "",
        _e.chaptersPNG_Path = "",
        _e.clear_over = [!1, !1],
        _e.count_down = 0;
    class fe {
        constructor() {
            this.typeResource = 0,
                this.commonLoad = !1,
                this.configLoadOver = !1,
                this.configGameResource = ["config/DropConfig.json", "config/MonsterConfig.json", "config/EquipDropConfig.json"],
                this.imgGameResource = ["res/atlas/battle.atlas", "res/atlas/levelup.atlas"],
                this.prefabGameResource = ["prefabs/flyCutter.json", "prefabs/dog.json", "prefabs/bomb.json", "prefabs/Rocket.json", "prefabs/Drop_Item.json", "prefabs/drop_gold.json", "prefabs/drop_weapon.json", "prefabs/drop_safe.json", "prefabs/bullet/rpg_bullet.json", "prefabs/air_bomb.json", "prefabs/air_skill.json", "prefabs/Enemy/FlyMan.json", "prefabs/Enemy/BombMan.json", "prefabs/bullet/fly_man_bullet.json", "prefabs/Enemy/RugWeakness.json", "prefabs/enemy.json"],
                this.skGameResource = ["enemy", s.drop_sk_path[0] + "", s.drop_sk_path[1] + "", "bomb", "blood", "battle_target", "start_go", "bomb_man", "bomb_man_bomb", "rpg_man", "boss_warning", "air_bomb_2", "air_bomb", "enemy_dead", "smoke_2", "enemy_sp/bomb_man_2", "enemy_sp/flying_soldier", "enemy_sp/oil_drum", "battle_target3"],
                this.configMainResource = ["config/ItemConfig.json", "config/LoginConfig.json", "config/SkillConfig.json", "config/TalentConfig.json", "config/LevelCustem.json"],
                this.imgCommonResource = ["res/atlas/common.atlas", "res/atlas/damage_number.atlas", "res/atlas/offline_speedup.atlas"],
                this.imgMainResource = ["res/atlas/icon.atlas", "res/atlas/daily.atlas", "res/atlas/perk.atlas", "res/atlas/setting.atlas", "res/atlas/main.atlas"],
                this.prefabMainResource = ["prefabs/WeaponItem/WeaponItem.json", "prefabs/gold_eff.json", "prefabs/goods_item.json", "prefabs/Skill_item_lock.json", "prefabs/Gold_Tip.json"],
                this.skCommonResource = ["actor", "gun_fire_hit", "drop/drop_gold", "mult_gold_3", "loading1", "loading2", "loading3", "target_guide"],
                this.skMainNetResource = ["get_gold", "target/gun_target_moving", "compose_tips", "compose_tips_2", "mult_gold_1", "mult_gold_2", "mult_gold_4", "air_box"],
                this.soundResource = ["config/GlobalConfig.json", "config/ShareCount.json", "config/FunctionConfig.json"],
                this.mainSkIndex = 0,
                new o
        }
        static get Instance() {
            return null != this.instance && null != this.instance || (this.instance = new fe),
                this.instance
        }
        set TypeResource(e) {
            switch (this.typeResource = e, this.typeResource) {
                case 0:
                    if (this.imgResource = this.imgMainResource, this.configResource = this.configMainResource, this.skNetResource = this.skMainNetResource, u.Language == h.EN) {
                        let e = this.skNetResource.indexOf("mult_gold_1"),
                            t = this.skNetResource.indexOf("mult_gold_2");
                        this.skNetResource[e] = "mult_gold_en_1",
                            this.skNetResource[t] = "mult_gold_en_2"
                    }
                    this.commonLoad || (this.skNetResource = this.skNetResource.concat(this.skCommonResource), this.imgResource = this.imgResource.concat(this.imgCommonResource)),
                        this.prefabResource = this.prefabMainResource;
                    break;
                case 1:
                    this.imgResource = this.imgGameResource,
                        this.configResource = this.configGameResource,
                        this.skNetResource = this.skGameResource,
                        this.prefabResource = this.prefabGameResource,
                        this.skResource = this.skGameResource
            }
        }
        loadMusicRes() {
            if (this.commonLoad)
                return void this.loadPrefabResource();
            _.Dispatch(g.ChangeSliderDesc, "加载音效");
            let e = 0,
                t = s.NET_MUSIC_PATH,
                i = ["gun_sound/gun_bu.wav", "gun_sound/gun_chong.wav", "gun_sound/gun_ju.wav", "gun_sound/gun_san.wav", "gun_sound/gun_shou.wav", "scene_sound/bomb.wav", "scene_sound/button.wav", "scene_sound/drop_goods.wav", "scene_sound/result_popp.wav", "scene_sound/rocket.wav", "scene_sound/weapon_complex.wav", "scene_sound/add_hp.wav", "scene_sound/BGM.wav", "scene_sound/MBGM.wav", "scene_sound/wheel.wav", "scene_sound/letgo.wav", "scene_sound/air_fly.wav", "scene_sound/fly_equit.wav", "scene_sound/enemy_4.wav", "scene_sound/enemy_3.wav", "scene_sound/enemy_2.wav", "scene_sound/enemy_1.wav", "boss_sound/Blaster_atk.wav", "boss_sound/Bunker_atk.wav", "boss_sound/Lancer_atk.wav", "boss_sound/Rebel_atk.wav", "boss_sound/Rug_atk.wav"],
                a = function () {
                    e++,
                        this.progress_call_fun.call(this.caller, e / i.length),
                    e >= i.length && (this.loadPrefabResource(), e = null)
                };
            if (Laya.MiniAdpter) {
                let e = Laya.MiniAdpter.getFileInfo(t + i[0]);
                if (console.error("有没有音乐:", null == e), e)
                    this.loadPrefabResource();
                else
                    for (let e = 0; e < i.length; ++e)
                        Laya.MiniAdpter.downLoadFile(t + i[e], "sound", Laya.Handler.create(this, a))
            } else
                for (let e = 0; e < i.length; e++) {
                    const s = i[e];
                    Laya.loader.load(t + s, Laya.Handler.create(this, a))
                }
        }
        loadResource(e, t, s) {
            _.Dispatch(g.ChangeSliderDesc, "加载json"),
                this.caller = e,
                this.complete_call_fun = s,
                this.progress_call_fun = t,
                this.configLoadOver ? this.loadImgResource() : Laya.loader.load(this.configResource, Laya.Handler.create(this, () => {
                    0 == this.typeResource ? (this.loadMainConfigComplete(), _e.loadNetWorkConfig(e, this.progress_call_fun, this.loadImgResource.bind(this))) : this.loadGameConfigComplete()
                }), Laya.Handler.create(e, t, null, !1))
        }
        loadImgResource() {
            _.Dispatch(g.ChangeSliderDesc, "加载图集"),
                Laya.loader.load(this.imgResource, Laya.Handler.create(this, () => {
                    this.mainSkIndex = 0,
                        _.Dispatch(g.ChangeSliderDesc, "加载龙骨"),
                        this.loadEverySk()
                }), Laya.Handler.create(this.caller, this.progress_call_fun, null, !1))
        }
        loadEverySk() {
            if (this.mainSkIndex >= this.skNetResource.length) {
                if (this.progress_call_fun) {
                    let e = this.mainSkIndex / this.skNetResource.length;
                    this.progress_call_fun.call(this.caller, e)
                }
                0 == this.typeResource ? this.loadMainSkComplet() : this.loadGameSkComplet()
            }
            if (_e.LoadNetSkeleton(this.skNetResource[this.mainSkIndex], this.caller, null, this.loadEverySk.bind(this)), this.mainSkIndex++, this.progress_call_fun) {
                let e = this.mainSkIndex / this.skNetResource.length;
                this.progress_call_fun.call(this.caller, e)
            }
        }
        loadPrefabResource() {
            _.Dispatch(g.ChangeSliderDesc, "加载预制件"),
                Laya.loader.load(this.prefabResource, Laya.Handler.create(this, () => {
                    this.complete_call_fun.call(this.caller),
                        Mt.changeBg("main/main_bg_2.png")
                }), Laya.Handler.create(this.caller, this.progress_call_fun, null, !1))
        }
        loadMainConfigComplete() {
            let e = Laya.loader.getRes(this.configResource[0]),
                t = Laya.loader.getRes(this.configResource[1]),
                s = Laya.loader.getRes(this.configResource[2]),
                i = Laya.loader.getRes(this.configResource[3]),
                a = Laya.loader.getRes(this.configResource[4]);
            C.Instance.parseItemConfig(e),
                C.Instance.parseTalentConfig(i),
                C.Instance.parsePropConfig(s),
                C.Instance.parseLoginConfig(t),
                X.Instance.parseLevelCustem(a);
            for (let e = 0; e < this.configResource.length; e++) {
                const t = this.configResource[e];
                Laya.loader.clearRes(t)
            }
        }
        loadGameConfigComplete() {
            let e = Laya.loader.getRes(this.configResource[0]),
                t = Laya.loader.getRes(this.configResource[1]),
                s = Laya.loader.getRes(this.configResource[2]);
            X.Instance.parseDropConfig(e),
                X.Instance.parseMonsterConfig(t),
                X.Instance.parseEquipDropConfig(s),
                this.configLoadOver = !0,
                this.loadImgResource()
        }
        loadMainSkComplet() {
            m.Instance.initGoldSpeedTemp(),
                m.Instance.initGoldTmep(),
            this.commonLoad || m.Instance.initCommonTemp(),
                this.loadMusicRes()
        }
        loadGameSkComplet() {
            m.Instance.initShootDirTemp(),
                m.Instance.initEnemy(),
                m.Instance.initGo(),
                m.Instance.initDropGood(),
                m.Instance.initSpecialEnemy(),
                this.loadPrefabResource()
        }
        clearLocalSKResurece() {
            for (let e = 0; e < this.skResource.length; e++) {
                const t = this.skResource[e];
                let s = t + ".sk",
                    i = t.replace(".sk", ".png");
                Laya.loader.clearRes(s),
                    Laya.loader.clearRes(i)
            }
        }
    }
    class ye extends Laya.Script {
        constructor() {
            super()
        }
        static showbanner() {}
        static showAppBox() {}
        static showview(e) {
            playVideo(res => {
                if (res) {
                    e()
                }
            })
        }
        static showcustomAd() {}
    }
    ye._nativeAd = null,
        ye.bannerAd = null,
        ye._nativeData = null,
        ye.GamePortalAd = null,
        ye.videoAd = null;
    class Se extends Laya.Script {
        constructor() {
            super(...arguments),
                this._limitData = null,
                this._limitCity = 1
        }
        static getInstance() {
            return Se.instance || (Se.instance = new Se),
                Se.instance
        }
        initSDK(e) {
            this._limitData = {}
        }
        getMaxNum() {
            return this._limitData.hasOwnProperty("data") ? this._limitData.data.a2 : 0
        }
        getShowDelay() {
            return this._limitData.hasOwnProperty("data") ? this._limitData.data.a1 : 0
        }
        getIsLimit() {
            return !(0 != this._limitCity || !this._limitData.hasOwnProperty("state") || 1 != this._limitData.state)
        }
        getIsAutoClose() {
            return !(!this._limitData.hasOwnProperty("data") || 1 != this._limitData.data.a3)
        }
        getDelayTime() {
            return this._limitData.hasOwnProperty("data") ? this._limitData.data.a4 : 0
        }
        getGaiLv() {
            return this._limitData.hasOwnProperty("data") ? this._limitData.data.a5 : 0
        }
        getYanSiTime() {
            return this._limitData.hasOwnProperty("data") ? this._limitData.data.a6 : 0
        }
        getJianGeTime() {
            return this._limitData.hasOwnProperty("data") ? this._limitData.data.a7 : 0
        }
        getOver() {
            return 0
        }
    }
    Se.instance = null;
    class be extends J.MainViewUI {
        constructor() {
            super(...arguments),
                this.addGoldSpeed = 1,
                this.addGoldProgress = 0,
                this.get_award_gold = 0,
                this.operate = !1,
                this.fingerTip = !1,
                this.secondInfo = "秒",
                this.changeGameFlag = !1,
                this.firstFinger = !0,
                this.add_bg_click = !1,
                this.playCount = 0,
                this.preX = 0,
                this.preY = 0,
                this.playEff = !1
        }
        onAwake() {
            this.mainManager = k.Instance,
                this.mainManager.MainUIManager = this,
            fe.Instance.commonLoad || (fe.Instance.commonLoad = !0),
            k.initSafeBoxManager || (k.initSafeBoxManager = !0, this.safeManager = new se, this.safeManager.init()),
                u.Language == r.EN ? (this.secondInfo = "sec", this.play_level.label = "Level." + X.Instance.level, this.boss_level.text = "Level." + X.Instance.level) : (this.play_level.label = "第" + X.Instance.level + "关", this.boss_level.text = "第" + X.Instance.level + "关"),
                this.finger = new Laya.Image,
                this.finger.skin = "main/finger.png",
                this.finger.zOrder = 1,
                this.finger.visible = !1,
                this.addChild(this.finger),
                this.initGoldSpeedSK(),
                this.gun_target = m.Instance.getSkeleton("target/gun_target_moving"),
                this.addChild(this.gun_target),
                this.gun_target.pos(637.5, 732),
                this.time_bar.visible = !1;
            let e = i.changeGoldUnit(X.Instance.gold);
            this.gold.text = "" + e,
                this.power_grap = this.power_progress.graphics,
                this.gold_boxs = [],
                this.addButtonEffListener(),
                this.updateUITip(),
                this.updateAddGoldSecond(),
                this.mainManager.powerRecoverCount(),
                this.power_value.text = B.Instance.power_info[1] + "/" + this.mainManager.power_limit,
            this.mainManager.judgePowerLimit() || (this.power_progress.visible = !1),
                this.initSk(),
                _.Dispatch(g.ShowBannerAD, 0)
        }
        initGoldSpeedSK() {
            this.firePlaySK = m.Instance.firePlayerTmep.buildArmature(0);
            let e = "mult_gold_";
            u.Language == r.EN && (e = "mult_gold_en_"),
                this.goldSpeedingSK = m.Instance.getSkeleton(e + "2"),
                this.goldSpeedOverSK = m.Instance.getSkeleton(e + "1"),
                this.player_show.addChild(this.firePlaySK),
                this.firePlaySK.pos(80, 227),
                this.add_gold_speed.addChild(this.goldSpeedOverSK),
                this.goldSpeedOverSK.pos(124, 28.5),
                this.time_bar.addChild(this.goldSpeedingSK),
                this.goldSpeedingSK.pos(59, -15),
                this.firePlaySK.play(0, !0),
                this.goldSpeedingSK.play(0, !0),
                this.goldSpeedOverSK.play(0, !0)
        }
        goldSpeedShow(e) {
            this.firePlaySK.visible = e[0],
                this.add_gold_speed.visible = !e[0],
                this.time_bar.visible = e[0],
                k.Instance.add_speed_flag = e[0],
                this.goldSpeedShootSpeed()
        }
        onSubscribe() {}
        judgeAddGoldSpeed() {
            let e = C.Instance.getTalentConfig()[3][B.Instance.talents[3]].Talent_Value;
            B.Instance.every_day_add_speed_count[1] < e ? (this.add_gold_speed.visible = !0, this.changeGoldSpeedMul()) : this.add_gold_speed.visible = !1,
                this.firePlaySK.visible = !1
        }
        changeGoldSpeedMul() {
            let e = C.Instance.getTalentConfig(),
                t = (e[3][B.Instance.talents[3]].Talent_Value, e[2][B.Instance.talents[2]].Talent_Value + "");
            this.bai.loadImage("damage_number/damagered_num_" + t[0] + ".png"),
                this.shi.loadImage("damage_number/damagered_num_" + t[1] + ".png"),
                this.ge.loadImage("damage_number/damagered_num_" + t[2] + ".png"),
                this.ing_bai.loadImage("damage_number/damagered_num_" + t[0] + ".png"),
                this.ing_shi.loadImage("damage_number/damagered_num_" + t[1] + ".png"),
                this.ing_ge.loadImage("damage_number/damagered_num_" + t[2] + ".png")
        }
        updatePowerLimit() {
            this.mainManager.power_limit == B.Instance.power_info[1] && (this.mainManager.power_recover_timer = 0, this.power_progress.visible = !1),
                this.mainManager.power_limit = C.Instance.getTalentConfig()[4][B.Instance.talents[4]].Talent_Value,
                this.power_value.text = B.Instance.power_info[1] + "/" + this.mainManager.power_limit,
                B.Instance.savePowerValue()
        }
        updateSharePowerSuccess() {
            B.Instance.power_info[1] >= this.mainManager.power_limit && (this.mainManager.power_recover_timer = 0, this.power_progress.visible = !1),
                B.Instance.power_info[1] += 5,
                this.power_value.text = B.Instance.power_info[1] + "/" + this.mainManager.power_limit,
                B.Instance.savePowerValue(),
                m.Instance.showGoldAward(this, 5, 85, 172)
        }
        updateAddGoldSecond() {
            this.add_gold_second = X.Instance.getLevelEarnings();
            let e = i.changeGoldUnit(this.add_gold_second);
            this.second.text = "+" + e + "/" + this.secondInfo,
                this.addGoldSpeed = this.add_gold_second
        }
        updateUITip() {
            let e = B.Instance.getWeaponComplex();
            this.knaspace_tip_icon.visible = e[0] || e[1] || e[2],
                this.talent_tip_icon.visible = k.Instance.judageTalentLevel();
            let t = X.Instance.skillsData;
            for (let e = 0; e < t.length; e++) {
                const s = t[e];
                if (0 !== s && X.Instance.gold >= Math.pow(s, 3))
                    return void(this.skill_tip_icon.visible = !0)
            }
            this.skill_tip_icon.visible = !1
        }
        initSk() {
            null !== this.player && void 0 !== this.player || (this.player = m.Instance.playerTemp.buildArmature(1), this.player_box.addChild(this.player), this.player.pos(0, 0), this.player.play("fire_body_1", !1), this.playerDown = m.Instance.playerTemp.buildArmature(1), this.player_box.addChild(this.playerDown), this.playerDown.pos(0, 0), this.playerDown.play("stand_leg", !0));
            let e = B.Instance.getMaxWeapon()();
            this.player.replaceSlotSkinByIndex("head", 0, e[1] - 1),
                this.player.replaceSlotSkinByIndex("gun", 0, e[0] - 1),
                this.player.replaceSlotSkinByIndex("gun_fire", 0, e[0] - 1),
                this.player.replaceSlotSkinByIndex("cloth_out", 0, e[2] - 1),
                this.player.replaceSlotSkinByIndex("cloth", 0, e[2] - 1),
                this.playerDown.replaceSlotSkinByIndex("head", 0, e[1] - 1),
                this.playerDown.replaceSlotSkinByIndex("gun", 0, e[0] - 1),
                this.playerDown.replaceSlotSkinByIndex("gun_fire", 0, e[0] - 1),
                this.playerDown.replaceSlotSkinByIndex("cloth_out", 0, e[2] - 1),
                this.playerDown.replaceSlotSkinByIndex("cloth", 0, e[2] - 1),
                B.Instance.add_gold_speed_time[0] > 0 ? this.goldSpeedShow([!0]) : this.goldSpeedShootSpeed(),
                k.Instance.onGameShow()
        }
        goldSpeedShootSpeed() {
            let e = B.Instance.getMaxWeapon()();
            k.Instance.shootSpeed(e[0] - 1, function () {
                let e = this.createGoldEff();
                this.createGoldEarning();
                let t = e.getComponent(te);
                this.addChild(e),
                    t.showTip(this.addGoldSpeed),
                    this.player.play(0, !1),
                    this.gun_target.play(0, !1),
                    m.Instance.addATKEffSK(this, 638, 643)
            }
                .bind(this))
        }
        addButtonEffListener() {
            ee.buttonEff(this.add_gold_speed, this, this.openSpeedPopp),
                ee.buttonEff(this.setting, this, this.openSettingPopp),
                ee.buttonEff(this.sign, this, this.openSignPopp),
                ee.buttonEff(this.play_level, this, this.changeGameScene),
                ee.buttonEff(this.play_boss_level, this, this.changeGameScene),
                ee.buttonEff(this.knaspace, this, this.openKnaspacePopp),
                ee.buttonEff(this.skill, this, this.openSkillPopp),
                ee.buttonEff(this.talent, this, this.openTalentPopp),
                ee.buttonEff(this.addPower, this, this.openSharePower),
                ee.buttonEff(this.AppBox, this, this.openAppBox)
        }
        addListener() {
            _.AddListener(g.ChangeSpeedState, this, this.goldSpeedShow),
                _.AddListener(g.MainPlayerUpdate, this, this.initSk),
                _.AddListener(g.UpdateMainUITip, this, this.updateUITip),
                _.AddListener(g.UpdateGoldMain, this, this.updateGoldUI),
                _.AddListener(g.UpdatePowerLimit, this, this.updatePowerLimit),
                _.AddListener(g.UpdateTalentGoldSpeed, this, this.judgeAddGoldSpeed),
                _.AddListener(g.UpdateAddGoldSecond, this, this.updateAddGoldSecond),
                _.AddListener(g.UpdateSharePower, this, this.updateSharePowerSuccess)
        }
        openAppBox() {
            console.log("点击设置展示原生"),
            Se.getInstance().getOver() && ye.showcustomAd(),
                _.Dispatch(g.PlayAppbox)
        }
        openSharePower() {
            console.log("点击设置展示原生"),
            Se.getInstance().getOver() && ye.showcustomAd(),
                _.Dispatch(g.AppendBox, "prefabs/Popp/SharePopp.json", 1)
        }
        openSpeedPopp() {
            console.log("点击设置展示原生"),
            Se.getInstance().getOver() && ye.showcustomAd(),
                _.Dispatch(g.AppendBox, "prefabs/Popp/GoldSpeedPopp.json")
        }
        openSettingPopp() {
            console.log("点击设置展示原生"),
            Se.getInstance().getOver() && ye.showcustomAd(),
                _.Dispatch(g.AppendBox, "prefabs/Popp/SystemManaPopp.json")
        }
        openSignPopp() {
            console.log("点击设置展示原生"),
            Se.getInstance().getOver() && ye.showcustomAd(),
                _.Dispatch(g.AppendBox, "prefabs/Popp/SignPopp.json")
        }
        changeGameScene() {
            console.log("点击展示原生"),
            Se.getInstance().getOver() && ye.showcustomAd(),
                B.Instance.power_info[1] > 0 ? (this.changeGameFlag = !0, k.Instance.clearTimeSelf(), Laya.timer.clear(this, this.updateSecond), this.fingerTween && (this.fingerTween.clear(), this.fingerTween = null), this.finger.visible = !1, o.pauseBgMusic(), k.Instance.play_gun_sound = !1, this.ma_sk.visible = !0, this.ma_sk.mouseEnabled = !0, this.ma_sk.mouseThrough = !1, T.loadSceneIndex = 1, B.Instance.power_info[1]--, B.Instance.savePowerValue(-1), _.Dispatch(g.HideSafeBox), se.safeBoxPoppExist = !0, _.Dispatch(g.ReSafeBoxCreate), Ie.Instance.startLoading(this, Mt, Mt.openScene.bind(Mt, "GameView.json", !0), 1)) : (this.power_tip.visible = !0, Laya.Tween.to(this.power_tip, {
                    y: 700
                }, 1e3, null, Laya.Handler.create(this, () => {
                    this.power_tip.y = 1090,
                        this.power_tip.visible = !1
                })), this.openSharePower())
        }
        openKnaspacePopp() {
            console.log("点击设置展示原生"),
            Se.getInstance().getOver() && ye.showcustomAd(),
                _.Dispatch(g.AppendBox, "prefabs/View/KnaspaceUI.json")
        }
        openSkillPopp() {
            console.log("点击设置展示原生"),
            Se.getInstance().getOver() && ye.showcustomAd(),
                _.Dispatch(g.AppendBox, "prefabs/Popp/SkillPopp.json")
        }
        openTalentPopp() {
            Se.getInstance().getOver() && ye.showcustomAd(),
                _.Dispatch(g.AppendBox, "prefabs/Popp/TalentPopp.json")
        }
        onEnable() {
            this.addListener(),
                this.changeGameFlag = !1;
            let e = X.Instance;
            this.ma_sk.visible = !1,
                o.playBgMusic("MBGM"),
                Laya.timer.loop(1e3, this, this.updateSecond),
                k.Instance.hasMainPage = !0,
                e.reGame(!0),
                Mt.changeBg("main/main_bg_2.png"),
                this.mainManager.updateGoldValue();
            let t = i.changeGoldUnit(e.gold);
            this.gold.text = "" + t,
                this.firstFinger = !0,
                this.complexTipFinger();
            let s = e.judgeBossLevel();
            this.play_boss_level.visible = s,
                this.play_level.visible = !s
        }
        complexTipFinger() {
            let e = !1,
                t = X.Instance.level,
                s = B.Instance.getWeaponComplex();
            for (let t = 0; t < s.length; t++) {
                if (s[t]) {
                    e = !0;
                    break
                }
            }
            if (e && t > 1 && t < 5) {
                this.fingerTip = !0;
                let e = 2e3;
                this.firstFinger && (this.firstFinger = !1, this.showFinger(), e = 5e3),
                    Laya.timer.once(e, this, this.showFinger)
            }
        }
        powerRecover() {
            if (B.Instance.power_info[1] < this.mainManager.power_limit) {
                let e = this.mainManager.powerRecover();
                this.power_grap.clear(),
                    this.power_progress.scale(1.1, 1.1),
                    Laya.Tween.to(this.power_progress, {
                        scaleX: 1,
                        scaleY: 1
                    }, 450, null, Laya.Handler.create(this, () => {
                        this.power_progress.scale(1.1, 1.1),
                            Laya.Tween.to(this.power_progress, {
                                scaleX: 1,
                                scaleY: 1
                            }, 450, null, Laya.Handler.create(this, () => {}))
                    })),
                    this.power_grap.drawPie(22, 26, 18, -90, 360 * e - 90, "#D44646"),
                this.mainManager.judgePowerRecoverTimeSuccess() && (this.power_value.text = B.Instance.power_info[1] + "/" + this.mainManager.power_limit, this.power_grap.clear())
            } else
                this.power_progress.visible = !1
        }
        updateSecond() {
            this.operate = !1,
                this.addGold(),
                this.powerRecover();
            let e = Mt.judgeBoxExist();
            k.Instance.play_gun_sound = e,
                this.operate = e,
                this.clearFingerEff()
        }
        clearFingerEff() {
            this.fingerTip && !this.operate && (this.finger.visible = !1, this.fingerTween && (this.fingerTween.clear(), this.fingerTween = null), Laya.timer.clear(this, this.showFinger), this.complexTipFinger())
        }
        addGold() {
            let e = 1;
            if (T.super_add_time > 0) {
                T.super_add_time -= 1,
                    e = 2,
                    this.addGoldProgress++;
                let t = Math.floor(T.super_add_time / 60),
                    s = T.super_add_time % 60,
                    i = s < 10 ? "0" + s : s + "",
                    a = t < 10 ? "0" + t : t + "";
                this.time_count.text = a + ":" + i,
                    T.super_add_time <= 0 ? (this.changeAddGoldSpeed(this.add_gold_second, 1), this.time_bar.visible && (this.time_bar.visible = !1, k.Instance.add_speed_flag = !1, this.goldSpeedShow([!1]), this.time_count.text = "00:00", B.Instance.add_gold_speed_time[0] = 0, B.Instance.saveAddSpeed(), k.Instance.goldSpeedMul = 1, this.mainManager.updateGoldValue())) : (this.time_bar.visible || (this.goldSpeedShow([!0]), k.Instance.add_speed_flag = !0), this.changeAddGoldSpeed(this.add_gold_second, e)),
                    B.Instance.add_gold_speed_time[0] = T.super_add_time
            }
        }
        updateGoldUI() {
            let e = i.changeGoldUnit(X.Instance.gold);
            this.gold.text = e + "",
                B.Instance.saveGameGold()
        }
        changeAddGoldSpeed(e, t) {
            let s = "0";
            2 == t ? (this.addGoldSpeed = e * k.Instance.goldSpeedMul, s = i.changeGoldUnit(this.addGoldSpeed), this.second.text = s + "/" + this.secondInfo) : (s = i.changeGoldUnit(e), this.second.text = s + "/" + this.secondInfo)
        }
        createGoldEff() {
            if (void 0 === this.goldEff || null === this.goldEff) {
                let e = Laya.loader.getRes("prefabs/gold_eff.json"),
                    t = new Laya.Prefab;
                t.json = e,
                    this.goldEff = t
            }
            return Laya.Pool.getItemByCreateFun("gold_eff", this.goldEff.create, this.goldEff)
        }
        onDisable() {
            _.Dispatch(g.SaveGameData),
                k.Instance.hasMainPage = !1,
                B.Instance.saveAddSpeed(),
                k.Instance.clearTimeSelf(),
                this.clearListener(),
                o.pauseBgMusic(),
                Laya.timer.clear(this, this.updateSecond),
                m.Instance.cycleSkeleton("target/gun_target_moving", this.gun_target),
                this.firePlaySK.removeSelf(),
                this.firePlaySK.destroy(!0),
                this.firePlaySK = null;
            let e = "mult_gold_";
            u.Language == r.EN && (e = "mult_gold_en_"),
                m.Instance.cycleSkeleton(e + "2", this.goldSpeedingSK),
                m.Instance.cycleSkeleton(e + "1", this.goldSpeedOverSK),
                this.player.removeSelf(),
                this.player.destroy(!0),
                this.player = null,
                this.playerDown.removeSelf(),
                this.playerDown.destroy(!0),
                this.playerDown = null
        }
        onDestroy() {
            this.gold_boxs = []
        }
        clearListener() {
            _.RemoveListener(g.ChangeSpeedState, this, this.goldSpeedShow),
                _.RemoveListener(g.MainPlayerUpdate, this, this.initSk),
                _.RemoveListener(g.UpdateMainUITip, this, this.updateUITip),
                _.RemoveListener(g.UpdateGoldMain, this, this.updateGoldUI),
                _.RemoveListener(g.UpdatePowerLimit, this, this.updatePowerLimit),
                _.RemoveListener(g.UpdateTalentGoldSpeed, this, this.judgeAddGoldSpeed),
                _.RemoveListener(g.UpdateAddGoldSecond, this, this.updateAddGoldSecond),
                _.RemoveListener(g.UpdateSharePower, this, this.updateSharePowerSuccess)
        }
        createGoldEarning() {
            this.mainManager.addGoldEarning() && (this.add_bg_click || (this.add_bg_click = !0, this.bg.once(Laya.Event.MOUSE_MOVE, this, () => {
                this.cycleAllGold()
            }))),
                this.createGoldAwardShow(200, this.gold_boxs.length > 30)
        }
        createGoldAwardShow(e = 200, s = !1) {
            let i = k.Instance.gold_award_arr,
                a = new Laya.Sprite;
            a.size(50, 50);
            let n = new Laya.Image;
            n.skin = "common/gold_max.png",
                this.addChild(a),
                a.addChild(n),
                a.pos(615, 606);
            let o = m.Instance.goldTemp,
                h = Laya.Pool.getItemByCreateFun("drop/drop_gold", o.buildArmature.bind(o, 0), o);
            a.addChild(h);
            let r = {};
            r.x = 576 - 500 * Math.random(),
                r.y = 683,
            k.Instance.add_speed_flag && (a.scale(1.5, 1.5), r.y = 665);
            let l = i[i.length - 1];
            s || (a.once(Laya.Event.MOUSE_MOVE, this, () => {
                this.cycleGold(a, h, l)
            }), this.gold_boxs.push(a)),
                b.bombTrack(a, r, 0, () => {
                    this.changeGameFlag || (h.pos(25, 50), n.removeSelf(), h.play(0, !1), s && Laya.timer.once(m.Instance.getGoldTimer(), this, () => {
                        t.cycleObject("drop/drop_gold", h),
                            a.removeSelf()
                    }))
                }, e, 1, 100)
        }
        cycleGold(e, s, a) {
            this.operate = !1,
                this.clearFingerEff();
            let n = k.Instance.gold_award_arr.pop();
            if (n) {
                let t = i.changeGoldUnit(X.Instance.gold);
                X.Instance.gold += n,
                    this.gold.text = t + "",
                    m.Instance.showGoldAward(this, n, e.x, e.y)
            } else
                n = 0;
            Laya.Tween.to(e, {
                x: 38,
                y: 103
            }, 250, null, Laya.Handler.create(this, () => {
                t.cycleObject("drop/drop_gold", s),
                    this.gold_boxs.splice(a, 1),
                    o.playSceneSound("drop_goods"),
                    e.removeSelf()
            }))
        }
        cycleAllGold() {
            this.add_bg_click = !1,
                o.playSceneSound("drop_goods"),
                this.operate = !1,
                this.clearFingerEff();
            for (let e = this.gold_boxs.length - 1; e >= 0; e--) {
                const t = this.gold_boxs[e];
                let s = this.mainManager.gold_award_arr[e];
                s && m.Instance.showGoldAward(this, s, t.x, t.y),
                    Laya.Tween.to(t, {
                        x: 38,
                        y: 103
                    }, 500, null, Laya.Handler.create(this, () => {
                        t.removeSelf()
                    }))
            }
            this.mainManager.getAllGoldAward();
            let e = i.changeGoldUnit(X.Instance.gold);
            this.gold.text = e + "",
                this.gold_boxs = []
        }
        showFinger() {
            this.finger.visible = !0,
                this.playEff = !0,
                this.finger.scale(.8, .8),
                this.preY = this.knaspace.y,
                2 == X.Instance.level ? this.preX = this.knaspace.x - 50 : 5 == X.Instance.level ? this.preX = this.skill.x - 50 : (this.playCount % 2 == 0 ? this.preX = this.knaspace.x - 50 : this.preX = this.skill.x - 50, this.playCount++),
                this.fingerEff()
        }
        fingerEff() {
            if (!this.playEff)
                return this.finger.visible = !1, void Laya.timer.once(2e3, this, this.showFinger);
            this.finger.pos(325, 567),
                this.fingerTween = Laya.Tween.to(this.finger, {
                    x: this.preX,
                    y: this.preY
                }, 1e3, null, Laya.Handler.create(this, () => {
                    this.fingerTween = Laya.Tween.to(this.finger, {
                        scaleX: .7,
                        scaleY: .7
                    }, 500, null, Laya.Handler.create(this, () => {
                        this.fingerTween = Laya.Tween.to(this.finger, {
                            scaleX: .9,
                            scaleY: .9
                        }, 500, null, Laya.Handler.create(this, () => {
                            this.fingerTween = Laya.Tween.to(this.finger, {
                                scaleX: .8,
                                scaleY: .8
                            }, 500, null, Laya.Handler.create(this, () => {
                                this.fingerEff(),
                                    this.playEff = !1
                            }))
                        }))
                    }))
                }))
        }
        clearMainPageResource() {
            let e = ["prefabs/Popp/OpenTreasurePopp.json", "prefabs/Popp/ShopTreasurePopp.json", "prefabs/Popp/WeaponLevelUpPopp.json", "prefabs/Popp/GoldSpeedPopp.json", "prefabs/Popp/WeaponStorePopp.json", "prefabs/Popp/WeaponMaxPopp.json", "prefabs/Popp/OffLinePopp.json", "prefabs/Popp/SystemManaPopp.json", "prefabs/Popp/SignPopp.json", "prefabs/View/KnaspaceUI.json", "prefabs/Popp/SkillPopp.json", "prefabs/Popp/TalentPopp.json", "prefabs/Popp/SkillVideoPopp.json"];
            Laya.Pool._poolDic = {};
            for (let t = 0; t < e.length; t++)
                Laya.loader.clearRes(e[t]);
            Laya.loader.clearRes("MainView.json");
            let t = ["res/atlas/item.atlas", "res/atlas/icon.atlas", "res/atlas/daily.atlas", "res/atlas/setting.atlas", "res/atlas/perk.atlas", "res/atlas/main.atlas", "res/atlas/offline_speedup.atlas", "prefabs/WeaponItem/WeaponItem.json", "prefabs/gold_eff.json", "prefabs/goods_item.json", "prefabs/Skill_item_lock.json"];
            for (let e = 0; e < t.length; e++)
                Laya.loader.clearRes(t[e]);
            Laya.Scene.closeAll()
        }
    }
    class Ie {
        constructor() {
            this.loadResType = 0,
                this.resetLoad = !0
        }
        static get Instance() {
            return null != this.instance && null != this.instance || (this.instance = new Ie),
                this.instance
        }
        startLoading(e, t, s, i) {
            if (this.caller = t, this.complete = s, this.parent = e, this.loadResType = i, null == this.childern || null == this.childern) {
                this.childern = [];
                for (let e = 0; e < 3; e++)
                    this.childern.push(m.Instance.loadingTemps[e].buildArmature(0))
            }
            this.playLoadAnim(0),
                Laya.timer.once(m.Instance.getLoadingTimer(), this, this.loadGameResurce)
        }
        loadGameResurce() {
            this.playLoadAnim(1, !0);
            let e = new Laya.Text;
            u.Language == r.EN ? 0 == this.loadResType ? e.text = "Join Main......" : e.text = "Join Battle......" : 0 == this.loadResType ? e.text = "正在前往营地......" : e.text = "正在前往战场......",
                e.color = "#ffb137",
                e.bold = !0,
                e.fontSize = 30,
                this.parent.addChild(e),
                e.x = 375 - e.width / 2,
                e.y = 850,
                e.zOrder = 4,
            this.parent instanceof be && (this.parent.ma_sk.visible = !0),
                this.resetLoad ? (this.resetLoad = !1, fe.Instance.TypeResource = this.loadResType, fe.Instance.loadResource(this, null, this.loadComplete)) : this.loadComplete()
        }
        loadComplete() {
            this.childern[0].removeSelf(),
                this.childern[1].removeSelf();
            let e = 0 == this.loadResType ? "MainView.json" : "GameView.json";
            Laya.Scene.open(e, !0, null, Laya.Handler.create(this, () => {}))
        }
        loadOver() {
            this.childern[2].removeSelf(),
                this.complete.call(this.caller)
        }
        playLoadAnim(e, t = !1) {
            this.parent.addChild(this.childern[e]),
                this.childern[e].zOrder = 4,
                this.childern[e].pos(375, 667),
                this.childern[e].play(0, t)
        }
        playGameStartInitAnim(e) {
            e.addChild(this.childern[2]),
                this.childern[2].zOrder = 4,
                this.childern[2].pos(375, 667),
                this.childern[2].play(0, !1),
                Laya.timer.once(m.Instance.getLoadingTimer(), this, () => {
                    this.childern[2].removeSelf()
                })
        }
    }
    var we = c.SpecialEnemy;
    class Le extends J.GameViewUI {
        constructor() {
            super(),
                this.level_len = 260,
                this.level_curr_len = 0,
                this.level_all_len = 0,
                this.level_scene = "",
                this.go_over = !1,
                this.hasSafeBox = !1,
                this.exitGameFlag = !1,
                this.frame = 0,
                this.createCount = 0
        }
        static get Instance() {
            return this.instance
        }
        getEffGroup() {
            return this.effGroup
        }
        onAwake() {
            this.specialEnemys = [],
                _.Dispatch(g.ShowBannerAD, 1),
                o.playBgMusic("BGM"),
                Ie.Instance.playGameStartInitAnim(this),
                this.move_speed = X.Instance.getGlobalConfigInfo().MoveSpeed,
                this.skills_num = [],
                this.medial_self.visible = !1,
                this.level_box = this.getChildByName("level_box_1"),
                this.gold.text = i.changeGoldUnit(X.Instance.gold),
                this.changeSkillState(),
                this.addButtonEffListener(),
                this.curr_scene_x = this.x,
                this.curr_scene_y = this.y,
            this.shoot_dir || (this.shoot_dir = m.Instance.getSkeleton("battle_target3"), this.move_obj.addChild(this.shoot_dir), this.shoot_dir.pos(192, 710), this.shoot_dir.play(0, !1), this.shootStateInterval = m.Instance.shootDirTemp.getAniDuration(0)),
                this.initGame()
        }
        resumeGame() {
            X.Instance.PauseGame = !1,
                Laya.timer.clear(this, this.onUpdate),
                Laya.timer.frameLoop(1, this, this.onUpdate)
        }
        changeSkillState() {
            let e = X.Instance.skillsData,
                t = C.Instance.getSkillConfig();
            for (let s = 0; s < t.length; s++) {
                const i = t[s][0];
                e[s] > 0 ? this.skills_num[s] = i[3] : (this.skills_num[s] = -1, i[2] <= X.Instance.level && (this.skills_num[s] = 1, X.Instance.skillsData[s] = 1));
                let a = "第",
                    n = "关解锁";
                if (u.Language == h.EN && (a = "Lv.", n = " unlock"), !this.skills_num[s] || -1 == this.skills_num[s])
                    switch (s) {
                        case 1:
                            this.prop2_tip.text = a + i[2] + n;
                            break;
                        case 2:
                            this.prop3_tip.text = a + i[2] + n;
                            break;
                        case 3:
                            this.prop4_tip.text = a + i[2] + n;
                            break;
                        case 4:
                            this.prop5_tip.text = a + i[2] + n
                    }
            }
            this.skills_count_num = this.skills_num,
                this.changePropBtnData(this.prop1, this.prop1_tip, 0),
                this.changePropBtnData(this.prop2, this.prop2_tip, 1),
                this.changePropBtnData(this.prop3, this.prop3_tip, 2),
                this.changePropBtnData(this.prop4, this.prop4_tip, 3),
                this.changePropBtnData(this.prop5, this.prop5_tip, 4)
        }
        changePropBtnData(e, t, s) {
            let i = ["knife", "dog", "granade", "rpg", "medical"];
            -1 !== this.skills_num[s] && (e.removeChildren(), e.skin = "battle/skill_" + i[s] + ".png", t.text = "" + this.skills_num[s])
        }
        updatePropNum(e) {
            switch (e) {
                case 0:
                    this.prop1_tip.text = this.skills_num[e] + "";
                    break;
                case 1:
                    this.prop2_tip.text = this.skills_num[e] + "";
                    break;
                case 2:
                    this.prop3_tip.text = this.skills_num[e] + "";
                    break;
                case 3:
                    this.prop4_tip.text = this.skills_num[e] + "";
                    break;
                case 4:
                    this.prop5_tip.text = this.skills_num[e] + ""
            }
        }
        initGame() {
            this.reGame()
        }
        nextLevelGame() {
            this.reGame(),
                _.Dispatch(g.InitPlayer, this.playerScript)
        }
        reGame() {
            this.boss_tip.visible = X.Instance.judgeBossLevel(),
                u.Language == h.EN ? this.game_level.text = "Level." + X.Instance.level : this.game_level.text = "第" + X.Instance.level + "关",
                this.prop1.alpha = 1,
                this.prop1_tip.alpha = 1,
                this.prop2.alpha = 1,
                this.prop2_tip.alpha = 1,
                this.prop3.alpha = 1,
                this.prop3_tip.alpha = 1,
                this.prop4.alpha = 1,
                this.prop4_tip.alpha = 1,
                this.prop5.alpha = 1,
                this.prop5_tip.alpha = 1,
                this.shoot_dir.visible = !1,
                X.Instance.reGame(),
                this.changeSkillState(),
                this.level_progress.x = 10,
                this.level_curr_len = 0,
                this.player.x = -100,
                this.level_scene = X.Instance.getLevelScene(),
                this.effGroup.x = 0,
                this.enemyDieGroup.x = 0,
                this.bulletGroup.x = 0,
                this.move_obj.x = 0,
                this.treatureGroup.x = 0,
                this.effGroup.removeChildren(),
                this.enemyDieGroup.removeChildren(),
                this.bulletGroup.removeChildren(),
                this.treatureGroup.removeChildren(),
            null !== this.scene_self && void 0 !== this.scene_self && this.scene_self.removeSelf(),
                this.curr_scene_path = "prefabs/LevelSecen/" + this.level_scene + ".json",
                Laya.loader.load(this.curr_scene_path, Laya.Handler.create(this, () => {
                    let e = new Laya.Prefab;
                    e.json = Laya.loader.getRes(this.curr_scene_path),
                        Laya.loader.clearRes(this.curr_scene_path);
                    let t = ["res/atlas/BGScene/scene_1.atlas", "res/atlas/BGScene/scene_2.atlas", "res/atlas/BGScene/scene_3.atlas", "res/atlas/BGScene/scene_4.atlas", "res/atlas/BGScene/scene_5.atlas"];
                    for (let e = 0; e < t.length; e++)
                        Laya.loader.clearRes(t[e]);
                    let s = e.create();
                    this.level_box.addChild(s),
                        s.name = this.curr_scene_path,
                        this.getEnemy()
                }))
        }
        showStartGO() {
            this.exitGameFlag || (this.start_go || (this.start_go = m.Instance.getSkeleton("start_go"), this.start_go.zOrder = 3, this.go_tip_time = m.Instance.goTemp.getAniDuration(0)), this.special_eff.addChild(this.start_go), this.start_go.pos(375, 667), this.go_over = !0, o.playSceneSound("letgo"), this.start_go.play(0, !1), Laya.timer.once(this.go_tip_time, this, () => {
                this.go_over = !1,
                    this.start_go.removeSelf(),
                    m.Instance.cycleSkeleton("start_go", this.start_go)
            }))
        }
        clearGoOver() {}
        showBossTip() {
            m.Instance.addBossTipSK(this.special_eff, 375, 667, !1)
        }
        getEnemy() {
            this.scene_self = this.level_box.getChildByName(this.curr_scene_path);
            let e = this.scene_self.getChildByName("bgback");
            Mt.changeBg(e.skin);
            let t = e.skin.split("_");
            X.Instance.scene_bg_id = parseInt(t[t.length - 1]),
                this.enemyGroup = this.scene_self.getChildByName("MP"),
                this.far = this.scene_self.getChildByName("far"),
                this.back = this.scene_self.getChildByName("back"),
                this.ground = this.scene_self.getChildByName("ground"),
                this.front = this.scene_self.getChildByName("front"),
                this.level_all_len = e.width;
            for (let e = 0; e < this.enemyGroup.numChildren; e++) {
                this.enemyGroup.getChildAt(e)
            }
            Laya.Tween.to(this.player, {
                x: 100
            }, 800, null, Laya.Handler.create(this, () => {
                this.showStartGO()
            })),
                Le.instance = this,
                R.Instance.BulletGroup = this.bulletGroup,
                O.Instance.PropGroup = this.bulletGroup,
                this.initGroup(),
                Laya.timer.frameLoop(1, this, this.onUpdate)
        }
        onEnable() {
            this.exitGameFlag = !1,
                this.addLiseter()
        }
        initGroup() {
            let e = [];
            this.playerScript = this.player.getComponent(z);
            for (let t = 0; t < this.enemyGroup.numChildren; t++) {
                let s = this.enemyGroup.getChildAt(t).getComponent(A);
                e.push(s)
            }
            X.Instance.init(this.playerScript, e)
        }
        addLiseter() {
            _.AddListener(g.GamePausePopp, this, this.pauseGameUI),
                _.AddListener(g.ShowBossTip, this, this.showBossTip),
                _.AddListener(g.AddEnemyDie, this, this.addEnemyDieAnim),
                _.AddListener(g.UpdateGold, this, this.updateGameGold),
                _.AddListener(g.SkillEff, this, this.skillEffShake),
                _.AddListener(g.SafeBoxGameResume, this, this.resumeGame),
                _.AddListener(g.LoadMainUI, this, this.loadMainUI),
                _.AddListener(g.BossHpBar, this, this.showBossHpBar),
                _.AddListener(g.ShootAnim, this, this.shootAnimChange),
                _.AddListener(g.ChangeATKTarget, this, this.shootAnimTween),
                _.AddListener(g.ExitGame, this, this.exitGame)
        }
        removeListener() {
            _.RemoveListener(g.GamePausePopp, this, this.pauseGameUI),
                _.RemoveListener(g.ShowBossTip, this, this.showBossTip),
                _.RemoveListener(g.AddEnemyDie, this, this.addEnemyDieAnim),
                _.RemoveListener(g.UpdateGold, this, this.updateGameGold),
                _.RemoveListener(g.SkillEff, this, this.skillEffShake),
                _.RemoveListener(g.SafeBoxGameResume, this, this.resumeGame),
                _.RemoveListener(g.LoadMainUI, this, this.loadMainUI),
                _.RemoveListener(g.BossHpBar, this, this.showBossHpBar),
                _.RemoveListener(g.ShootAnim, this, this.shootAnimChange),
                _.RemoveListener(g.ChangeATKTarget, this, this.shootAnimTween),
                _.RemoveListener(g.ExitGame, this, this.exitGame)
        }
        updateGameGold() {
            this.gold.text = i.changeGoldUnit(X.Instance.gold)
        }
        shootAnimChange() {
            this.exitGameFlag || (this.shoot_dir && this.shoot_dir.play(0, !1), Laya.timer.once(this.shootStateInterval, this, () => {
                this.exitGameFlag || this.shoot_dir.templet && this.shoot_dir.play(1, !0)
            }))
        }
        shootAnimTween() {
            if (this.exitGameFlag)
                return void(this.shootTween && this.shootTween.clear());
            this.shoot_dir.scale(1, 1),
            this.shootTween && this.shootTween.clear();
            let e = this.playerScript.shootInterval / 2;
            this.shootTween = Laya.Tween.to(this.shoot_dir, {
                scaleX: 1.4,
                scaleY: 1.4
            }, e, null, Laya.Handler.create(this, () => {
                this.shootTween = Laya.Tween.to(this.shoot_dir, {
                    scaleX: 1,
                    scaleY: 1
                }, e, null, Laya.Handler.create(this, () => {}))
            }))
        }
        addButtonEffListener() {
            ee.buttonEff(this.prop1, this, this.useProp, !0, 0),
                ee.buttonEff(this.prop2, this, this.useProp, !0, 1),
                ee.buttonEff(this.prop3, this, this.useProp, !0, 2),
                ee.buttonEff(this.prop4, this, this.useProp, !0, 3),
                ee.buttonEff(this.prop5, this, this.useProp, !0, 4),
                ee.buttonEff(this.pauseGame, this, this.pauseGameUI)
        }
        useProp(e) {
            if (this.skills_num[e] > 0 && (this.skills_count_num[e]--, this.updatePropNum(e), X.Instance.useProp(e), 4 == e && (this.medial_self.visible = !0, this.medial_self.play(0, !1), Laya.timer.once(1e3, this, () => {
                this.medial_self.visible = !1
            })), this.skills_count_num[e] <= 0))
                switch (e) {
                    case 0:
                        this.prop1.alpha = .2,
                            this.prop1_tip.alpha = .2;
                        break;
                    case 1:
                        this.prop2.alpha = .2,
                            this.prop2_tip.alpha = .2;
                        break;
                    case 2:
                        this.prop3.alpha = .2,
                            this.prop3_tip.alpha = .2;
                        break;
                    case 3:
                        this.prop4.alpha = .2,
                            this.prop4_tip.alpha = .2;
                        break;
                    case 4:
                        this.prop5.alpha = .2,
                            this.prop5_tip.alpha = .2
                }
        }
        pauseGameUI() {
            console.log("点击暂停展示原生"),
            Se.getInstance().getOver() && ye.showcustomAd(),
                _.Dispatch(g.PauseGame),
                _.Dispatch(g.AppendBox, "prefabs/Popp/PauseGamePopp.json")
        }
        moveLevel() {
            if (750 - this.level_all_len < this.level_curr_len) {
                this.moveGameScene(),
                    this.level_curr_len -= this.move_speed;
                let e = Math.abs(-this.level_curr_len / (this.level_all_len - 750));
                this.level_progress.x = 10 + this.level_len * e,
                    X.Instance.gameProgress = Math.floor(100 * e)
            } else {
                let e = Math.abs(this.level_curr_len / (this.level_all_len - 750));
                X.Instance.gameProgress = Math.floor(100 * e),
                    this.playerScript.resultMove()
            }
        }
        moveGameScene() {
            this.ground.x -= this.move_speed,
                this.front.x -= this.move_speed,
                this.back.x -= this.move_speed - 2,
                this.far.x -= this.move_speed - 4,
                this.enemyGroup.x -= this.move_speed,
                this.bulletGroup.x -= this.move_speed,
                this.treatureGroup.x -= this.move_speed,
                this.effGroup.x -= this.move_speed,
                this.enemyDieGroup.x -= this.move_speed,
                this.move_obj.x -= this.move_speed
        }
        onUpdate() {
            this.go_over || (X.Instance.PauseGame || X.Instance.gameOver ? Laya.timer.clear(this, this.onUpdate) : (X.Instance.update(this.level_curr_len), this.shootDirPos()))
        }
        clearGameTimer() {
            Laya.timer.clear(this, this.onUpdate),
                this.shoot_dir.visible = !1
        }
        addEnemyDieAnim(e) {
            m.Instance.addEnemyDieAnimSK(this.enemyDieGroup, e[0], e[1])
        }
        onDisable() {
            o.pauseBgMusic(),
                o.gameOver(),
                this.removeListener(),
                se.safeBoxPoppExist = !1,
                _.Dispatch(g.ReSafeBoxCreate),
                m.Instance.cycleSkeleton("battle_target3", this.shoot_dir),
            this.go_over && this.start_go && (this.start_go.removeSelf(), m.Instance.cycleSkeleton("start_go", this.start_go))
        }
        skillEffShake(e) {
            let t = e[2] || 1,
                s = e[1] || 50,
                i = e[0];
            t--,
                this.skillTween(i, s, t)
        }
        skillTween(e, t, s) {
            let i = this.curr_scene_x + e,
                a = this.curr_scene_y + e;
            Laya.Tween.to(this, {
                x: i,
                y: a
            }, t, Laya.Ease.bounceInOut, Laya.Handler.create(this, () => {
                Laya.Tween.to(this, {
                    x: i - e,
                    y: a - e
                }, t, Laya.Ease.bounceInOut, Laya.Handler.create(this, () => {
                    s <= 0 ? (this.x = this.curr_scene_x, this.y = this.curr_scene_y) : (s--, this.skillTween(e, t, s))
                }))
            }))
        }
        createCommonEnemy(t, s, i, a, n) {
            let o = X.Instance;
            if (e.l("创建普通兵  ： " + this.createCount, "当前小兵的att: hp = " + t + " atk =" + s), !this.specialEnemys[we.COMMON_ENEMY]) {
                let e = Laya.loader.getRes("prefabs/enemy.json");
                this.specialEnemys[we.COMMON_ENEMY] = new Laya.Prefab,
                    this.specialEnemys[we.COMMON_ENEMY].json = e
            }
            let h = this.specialEnemys[we.COMMON_ENEMY].create();
            h.name = "monster_nouse",
                this.enemyGroup.addChild(h),
                h.pos(a, n);
            let r = h.getComponent(A);
            r.init(t, s, i, 0, 1, !0, 1),
                r.changeEnemySkin(0, 1, 1, 1),
                r.moveSelf(o.commonEnemys.length - 1),
                o.EnemyArray.push(r),
                o.commonEnemys.push(r)
        }
        createFlyMan(e, t, s, i, a = !1) {
            if (this.createCount++, !this.specialEnemys[we.FLY_MAN_ENEMY]) {
                let e = Laya.loader.getRes("prefabs/Enemy/FlyMan.json");
                this.specialEnemys[we.FLY_MAN_ENEMY] = new Laya.Prefab,
                    this.specialEnemys[we.FLY_MAN_ENEMY].json = e
            }
            let n = this.specialEnemys[we.FLY_MAN_ENEMY],
                o = Laya.Pool.getItemByCreateFun("fly_man_enemy_pf", n.create, n);
            this.enemyGroup.addChild(o);
            let h = o.getComponent(H);
            o.pos(900 - this.level_curr_len, 400),
                h.init(e, t, null, 0, 0, !0, 9),
                X.Instance.EnemyArray.push(h)
        }
        createBombSelfMan(t, s, i, a, n = !1) {
            if (e.l("创建飞行兵  ： " + this.createCount, "当前自爆小兵的att: hp = " + t + " atk =" + s), !this.specialEnemys[we.BOMB_SELF_ENEMY]) {
                let e = Laya.loader.getRes("prefabs/Enemy/BombMan.json");
                this.specialEnemys[we.BOMB_SELF_ENEMY] = new Laya.Prefab,
                    this.specialEnemys[we.BOMB_SELF_ENEMY].json = e
            }
            let o = this.specialEnemys[we.BOMB_SELF_ENEMY],
                h = Laya.Pool.getItemByCreateFun("bomb_man_enemy_pf", o.create, o);
            this.enemyGroup.addChild(h);
            let r = h.getComponent(F);
            r.init(t, s, null, 0, 0, !0, 10),
            n && X.Instance.bombEnemys.push(r),
                h.pos(900 - this.level_curr_len, 748),
                X.Instance.bombSelfMan.push(r),
                X.Instance.EnemyArray.push(r)
        }
        shootDirPos() {
            let e = 0,
                t = this.playerScript.getAtkHuman();
            if (t && !t.hasDie()) {
                this.shoot_dir.visible = !0;
                let s = t.name.split("_")[0],
                    i = 20;
                "helicopter" == s ? e = 50 : ("bomb" == s || t.HumanClass > 10 || t.HumanClass < 0) && (i = 0),
                    this.shoot_dir.pos(t.getSite().x - i, t.getSite().y + e)
            } else
                this.shoot_dir.visible = !1
        }
        clearGameRes() {
            let e = ["prefabs/Popp/ResultPopp.json", "prefabs/Popp/PauseGamePopp.json", "prefabs/flyCutter.json", "prefabs/dog.json", "prefabs/bomb.json", "prefabs/Rocket.json", "prefabs/Drop_Item.json", "prefabs/drop_gold.json", "prefabs/drop_weapon.json", "prefabs/drop_safe.json", "prefabs/bullet/rpg_bullet.json", "prefabs/air_bomb.json", "prefabs/air_skill.json", "prefabs/Enemy/FlyMan.json", "prefabs/Enemy/BombMan.json", "prefabs/bullet/fly_man_bullet.json", "prefabs/Enemy/RugWeakness.json", "prefabs/enemy.json"];
            Laya.Pool._poolDic = {};
            for (let t = 0; t < e.length; t++)
                Laya.loader.clearRes(e[t]);
            Laya.loader.clearRes("GameView.json");
            let t = ["res/atlas/battle.atlas", "res/atlas/levelup.atlas", "res/atlas/BGScene/scene_1.atlas", "res/atlas/BGScene/scene_2.atlas", "res/atlas/BGScene/scene_3.atlas", "res/atlas/BGScene/scene_4.atlas", "res/atlas/BGScene/scene_5.atlas"];
            for (let e = 0; e < t.length; e++)
                Laya.loader.clearRes(t[e]);
            Laya.Scene.closeAll()
        }
        loadMainUI() {
            Ie.Instance.startLoading(this, Mt, Mt.openScene.bind(Mt, "MainView.json", !0), 0)
        }
        showBossHpBar(e) {
            this.level_bar.visible = !e[0],
                this.bossHpBox.visible = e[0],
                this.boss_tip.visible = !e[0]
        }
        addFirstFinger() {
            this.fingerTemp = m.Instance.fingerTemp;
            let e = this.fingerTemp.buildArmature(0);
            return this.effGroup.addChild(e),
                e
        }
        exitGame() {
            this.exitGameFlag = !0
        }
    }
    class ve extends Laya.Script {
        constructor() {
            super(...arguments),
                this.flag = !1,
                this.animDis = !1
        }
        onAwake() {
            this.selfSp = this.owner,
                this.drop_icon = this.owner.getChildByName("drop_icon")
        }
        onEnable() {
            this.flag = !1,
                this.animDis = !1,
                _.AddListener(g.ExitGame, this, this.pauseAnim)
        }
        pauseAnim() {
            this.animDis = !0
        }
        initDropAnim(e) {}
        init(e, t) {
            this.selfSp = this.owner,
                this.drop_icon = this.owner.getChildByName("drop_icon"),
                this.initDropAnim(e),
            this.drop_anim && (this.drop_anim.visible = !1),
                this.drop_icon.visible = !0,
            2 == e && (this.selfSp.zOrder = 2);
            let s = {},
                i = 250 * Math.random();
            s.x = this.selfSp.x - i,
                s.y = 748,
                this.drop_anim_index = e,
                this.drop_num = t,
                this.play_time = m.Instance.dropTemps[e].getAniDuration(0),
                b.bombTrack(this.selfSp, s, 0, () => {
                    this.dropSuccess()
                }, 200 + i, 1)
        }
        dropSuccess() {
            this.animDis || (this.drop_icon.visible = !1, this.drop_anim.visible = !0, this.drop_anim.pos(this.selfSp.pivotX, this.selfSp.pivotY), this.drop_anim.play(0, !1), this.owner.on(Laya.Event.MOUSE_MOVE, this, () => {
                this.flag || 2 != this.drop_anim_index || m.Instance.showGoldAward(Le.Instance.getEffGroup(), this.drop_num[0], this.selfSp.x, this.selfSp.y - 60),
                    this.flag = !0
            }))
        }
        getDropGoodsSuccess() {
            o.playSceneSound("drop_goods"),
                2 == this.drop_anim_index ? ("number" == typeof this.drop_num[0] || this.drop_num[0] || (this.drop_num[0] = 0), X.Instance.gold += this.drop_num[0], X.Instance.super_add_gold += this.drop_num[0], _.Dispatch(g.UpdateGold)) : 0 == this.drop_anim_index && X.Instance.weapon_box.push(...this.drop_num),
                this.owner.removeSelf()
        }
        onUpdate() {
            if (!X.Instance.PauseGame && ((this.selfSp.x + Le.Instance.level_curr_len < 150 || this.selfSp.x < X.Instance.playerScript.getSite().x - Le.Instance.level_curr_len) && !this.flag && (this.flag = !0, 2 == this.drop_anim_index && m.Instance.showGoldAward(Le.Instance.getEffGroup(), this.drop_num[0], this.selfSp.x, this.selfSp.y - 60)), this.flag)) {
                let e = 100 - Le.Instance.level_curr_len;
                e = (this.selfSp.x - e) / 10,
                    this.selfSp.x -= e,
                    this.selfSp.y -= 20,
                this.selfSp.y < 150 && (this.getDropGoodsSuccess(), this.flag = !1)
            }
        }
        onDisable() {
            this.drop_anim.removeSelf(),
                m.Instance.cycleSkeleton(s.drop_sk_path[this.drop_anim_index], this.drop_anim),
                t.cycleObject(s.drop_sk_path[this.drop_anim_index] + this.drop_anim_index, this.owner)
        }
    }
    class Ce extends Laya.Script {
        constructor() {
            super(...arguments),
                this.monster_gold = -1
        }
        onAwake() {
            this.drop_prefab = [],
                this.drop_prefab[2] = new Laya.Prefab,
                this.drop_prefab[1] = new Laya.Prefab,
                this.drop_prefab[0] = new Laya.Prefab,
                this.drop_prefab[0].json = Laya.loader.getRes(s.drop_prefab_path[0]),
                this.drop_prefab[1].json = Laya.loader.getRes(s.drop_prefab_path[1]),
                this.drop_prefab[2].json = Laya.loader.getRes(s.drop_prefab_path[2])
        }
        onEnable() {
            this.drop_weigth = [],
                this.level_gold = X.Instance.getLevelGold()(),
                _.AddListener(g.EnemyDie, this, this.createTreasure),
                _.AddListener(g.ReGame, this, this.reGame)
        }
        countEnemyNum() {
            this.drop_weigth.length <= 0 && (this.drop_weigth = X.Instance.getEnemyDropWeigth())
        }
        reGame() {
            this.drop_weigth = [],
                this.level_gold = X.Instance.getLevelGold()()
        }
        createTreasure(e) {
            this.countEnemyNum();
            let t = [];
            t[0] = [],
                t[1] = [],
                t[2] = [];
            let s = e[1],
                i = e[0],
                a = X.Instance.getMonsterType(s),
                n = X.Instance.getEnemyGrop(s);
            if (0 == n.length)
                return;
            for (let e = 0; e < this.drop_weigth.length; e++) {
                const s = this.drop_weigth[e];
                let i = Math.random(),
                    o = Math.floor(s[0] * a);
                if (o = o < 1 ? 1 : o, i < s[0] * a && n[e].length > 0)
                    for (let i = 0; i < o; i++) {
                        let i = Math.floor(3 * Math.random()),
                            a = 1e3 * n[e][i][0] + s[1];
                        for (let o = 0; o < n[e][i][1]; o++)
                            0 !== s[1] && t[0].push(a)
                    }
            }
            t[0].length > 0 && this.createDropGoods(0, i, t);
            let o = this.level_gold / X.Instance.monster_count * X.Instance.getMonsterType(s);
            this.monster_gold = o;
            let h = X.Instance.getMonsterGoldNum(),
                r = h[0] + Math.floor((h[1] - h[0]) * Math.random()),
                l = Math.floor(this.monster_gold / r);
            t[2] = [l];
            for (let e = 0; e < r; e++)
                this.createDropGoods(2, i, t)
        }
        createDropGoods(t, i, a) {
            e.l("当前掉落的prefab : " + s.drop_sk_path[t] + t);
            let n = Laya.Pool.getItemByCreateFun(s.drop_sk_path[t] + t, this.drop_prefab[t].create, this.drop_prefab[t]);
            this.owner.addChild(n),
                n.pos(i.x, i.y),
                n.getComponent(ve).init(t, a[t])
        }
        onDisable() {
            _.RemoveListener(g.EnemyDie, this, this.createTreasure),
                _.RemoveListener(g.ReGame, this, this.reGame)
        }
    }
    class Te extends Laya.Script {
        constructor() {
            super(...arguments),
                this.sliderForground = void 0,
                this.descText = void 0,
                this.progressText = void 0,
                this.minLength = 40,
                this.progress = 0
        }
        onAwake() {
            this.ownerImg = this.owner,
                this.sliderBg = this.owner,
                this.resizeSlider(),
                this.changeProgress(this.progress),
            this.progressText && (this.progressText.text = ""),
            this.descText && (this.descText.text = "")
        }
        resizeSlider() {
            let e = this.sliderBg.width,
                t = this.sliderBg.height;
            this.sliderWidth = e,
                this.sliderForground.height = t,
                this.sliderForground.width = this.minLength,
            this.descText && (this.descText.width = e, this.descText.height = t),
            this.progressText && (this.progressText.width = e, this.progressText.height = t)
        }
        show(e) {
            this.ownerImg && (this.ownerImg.visible = e)
        }
        setDesc(e) {
            this.descText && (this.descText.text = e)
        }
        reSize(e, t) {
            this.sliderBg && (this.sliderBg.width = e, this.sliderBg.height = t, this.resizeSlider())
        }
        changeProgress(e) {
            if (this.progress = Math.min(e, 1), this.progress = Math.max(0, this.progress), this.sliderForground && this.sliderWidth && this.sliderForground.width) {
                let e = this.sliderWidth * this.progress;
                e = Math.max(e, this.minLength),
                    this.sliderForground.width = e
            }
            this.progressText && (this.progressText.text = Math.floor(100 * this.progress) + "%")
        }
        setPos(e) {
            this.ownerImg.pos(e.x, e.y)
        }
        onDestroy() {
            this.sliderBg = null,
                this.sliderBg = null,
                this.progress = null,
                this.sliderWidth = null,
                this.ownerImg = null,
                this.ownerImg = null
        }
    }
    var ke = J.LoginSceneUI;
    class xe extends ke {
        constructor() {
            super(...arguments),
                this.interval_time = 0
        }
        onAwake() {
            this.slider = this.Slider.getComponent(Te),
                this.slider.show(!1),
                T.Instance.init(),
                this.loadScenceResource()
        }
        onEnable() {
            _.AddListener(g.ChangeSliderDesc, this, this.changeSliderDesc)
        }
        loadScenceResource() {
            switch (this.slider.changeProgress(.1), this.slider.show(!0), T.loadSceneIndex) {
                case 0:
                    fe.Instance.TypeResource = 0,
                        fe.Instance.loadResource(this, this.updateProgress, this.changeScene);
                    break;
                case 1:
                    fe.Instance.TypeResource = 1,
                        fe.Instance.loadResource(this, null, this.changeScene)
            }
        }
        updateProgress(e) {
            this.slider.changeProgress(e)
        }
        changeScene() {
            this.slider.changeProgress(.1);
            let e = 0 === T.loadSceneIndex ? "MainView.json" : "GameView.json";
            Mt.openScene(e, !0, null, Laya.Handler.create(this, this.updateProgress))
        }
        changeSliderDesc(e) {
            this.slider.setDesc(e[0]),
                this.slider.changeProgress(.1),
                this.slider.show(!0)
        }
        onDisable() {
            _.RemoveListener(g.ChangeSliderDesc, this, this.changeSliderDesc)
        }
        onDestroy() {}
    }
    class Be extends Laya.Script {
        constructor() {
            super()
        }
        onEnable() {
            this.text = this.owner,
                this.localizeContext()
        }
        localizeContext() {
            u.Language == h.EN && this.text && (this.enContext && (this.text.text = this.enContext), this.enLineSpace && (this.text.leading = this.enLineSpace), this.enFontSize && (this.text.fontSize = this.enFontSize))
        }
    }
    class Ee extends Laya.Script {
        constructor() {
            super(),
                this.num = 0,
                this.posy = 0,
                this.txt = null,
                this.scrollbar = null
        }
        onAwake() {}
        onStart() {
            this.owner.getChildByName("button").on(Laya.Event.CLICK, this, this.close),
                this.txt.on(Laya.Event.MOUSE_DOWN, this, this.mousedown),
                this.txt.on(Laya.Event.MOUSE_MOVE, this, this.mousemove)
        }
        mousedown() {
            console.log("按下"),
                this.num = this.scrollbar.value,
                this.posy = Laya.MouseManager.instance.mouseY
        }
        mousemove() {
            console.log("移动");
            var e = Laya.MouseManager.instance.mouseY,
                t = e - this.posy;
            console.log("移动差值======" + t),
                this.posy = e;
            var s = this.txt.y + t;
            s >= 0 && (s = 0),
            s <= -2450 && (s = -2450),
                this.txt.y = s
        }
        getMousePos(e) {
            var t = document.documentElement.scrollLeft || document.body.scrollLeft,
                s = document.documentElement.scrollTop || document.body.scrollTop;
            return {
                x: e.pageX || e.clientX + t,
                y: e.pageY || e.clientY + s
            }
        }
        onUpdate() {}
        close() {
            this.owner.visible = !1,
                this.scrollbar.visible = !1
        }
    }
    class Ae extends Laya.Script {
        constructor() {
            super()
        }
        onEnable() {
            Laya.Scene.open("LoginScene.scene")
        }
        onDisable() {}
    }
    class De extends Laya.Script {
        constructor() {
            super(...arguments),
                this.start_num = 1,
                this.pause = !1
        }
        onAwake() {
            this.self = this.owner
        }
        onEnable() {
            this.air = m.Instance.getSkeleton("air_bomb"),
                this.owner.addChild(this.air),
                this.air.pos(0, 0),
                this.air.scale(.65, .65),
                this.self.pos(-130, 219),
                this.pause = !1,
                this.air.play(0, !0);
            let e = Math.floor(X.Instance.skillsData[2] / 5) + 1;
            this.bomb_num = e > 5 ? 5 : e,
                this.dis = 375 / (this.bomb_num + 1),
                this.start_num = 0
        }
        onUpdate() {
            if (!X.Instance.PauseGame) {
                if (this.self.x > 850)
                    return this.self.removeSelf(), void o.stopSound("air_fly");
                this.self.x += 10,
                !this.pause && this.self.x >= this.dis * this.start_num + 375 && (X.Instance.createAirBomb(this.start_num + 1, this.dis), this.start_num++, this.start_num >= this.bomb_num && (this.pause = !0))
            }
        }
        onDisable() {
            t.cycleObject("air_skill", this.owner),
                m.Instance.cycleSkeleton("air_bomb", this.air),
                this.air.removeSelf(),
                Laya.timer.clearAll(this)
        }
    }
    class Re extends Laya.Script {
        onAwake() {
            this.selfSp = this.owner
        }
        onEnable() {}
        init(e, t, s, i) {
            this.atk = e,
                this.bombScope = i,
                this.human = t,
                this.selfSp.x = s.x,
                this.selfSp.y = s.y;
            let a = null == t ? {
                    x: s.x + 500,
                    y: s.y
                }
                : t.getSite();
            b.bombTrack(this.selfSp, a, 5, this.bombEff.bind(this))
        }
        bombEff() {
            o.playSceneSound("bomb"),
                m.Instance.addSkillEffSk(this.owner.parent, this.selfSp.x, this.selfSp.y);
            let t = X.Instance.EnemyArray;
            for (let s = 0; s < t.length; s++) {
                const i = t[s];
                let a = Math.abs(i.getSite().x - this.selfSp.x);
                if (a <= this.bombScope) {
                    let t = Math.abs(i.getSite().y - this.selfSp.y),
                        s = Math.sqrt(a * a + t * t);
                    e.l(s),
                    Math.sqrt(a * a + t * t) < this.bombScope && i.subHp(this.atk)
                }
            }
            O.Instance.recoverBomb(this.owner),
                this.owner.removeSelf()
        }
    }
    class Ge extends ve {
        initDropAnim(e) {
            let t = m.Instance.goldTemp;
            this.drop_anim = Laya.Pool.getItemByCreateFun(s.drop_sk_path[e], t.buildArmature.bind(t, 0), t),
                this.owner.addChild(this.drop_anim),
                this.owner.size(150, 150)
        }
    }
    class Pe extends Laya.Script {
        onAwake() {
            this.drop_icon = this.owner.getChildByName("drop_icon"),
                this.level_bg = this.owner.getChildByName("level_bg"),
                this.level = this.owner.getChildByName("level"),
                this.drop_self = this.owner
        }
        init(e, t, s) {
            this.level.text = t + "";
            let i = C.Instance.getItemConfig()[e][t - 1].Item_BGColor;
            this.drop_icon.skin = "icon/" + s + "_" + t + ".png",
                this.drop_self.loadImage("item/item_level_" + i + ".png"),
                this.level_bg.loadImage("item/item_level_mark_" + i + ".png")
        }
    }
    class Me extends ve {
        initDropAnim(e) {
            this.drop_anim = m.Instance.getSkeleton(s.drop_sk_path[e]),
                this.owner.addChild(this.drop_anim),
                this.owner.size(200, 200)
        }
    }
    class Ne extends ve {
        initDropAnim(e) {
            this.drop_anim = m.Instance.getSkeleton(s.drop_sk_path[e]),
                this.owner.addChild(this.drop_anim),
                this.owner.size(200, 200)
        }
    }
    class Oe {
        constructor() {
            this.hpLen = 440,
                this.hpCount = 0,
                this.subHpCount = 0,
                this.fullHp = 0,
                this.hp = 0,
                this.subHp = 0,
                this.subInterval = 0,
                this.hpEffing = !1,
                this.currSubHp = 0,
                this.currSubHpCount = 0,
                this.currTimer = 0,
                this.preTimer = 0,
                this.currSubCountFlag = !0,
                this.hpCount = X.Instance.getGlobalConfigInfo().boss_HPSum
        }
        init(e, t, s, i) {
            this.subHpQueue = [],
                this.parent = s,
                this.fullHp = e,
                this.hp = e / this.hpCount,
                this.boss = i,
                this.subHp = 0,
                this.initUI(),
                this.SubHp(t)
        }
        initUI() {
            this.bgImage = new Laya.Image,
                this.greenImage = new Laya.Image,
                this.redImage = new Laya.Image,
                this.bgImage.skin = "battle/boss_hp_1.png",
                this.greenImage.skin = "battle/boss_hp_3.png",
                this.redImage.skin = "battle/boss_hp_2.png",
                this.bgImage.sizeGrid = "11,11,9,9",
                this.greenImage.sizeGrid = "11,11,9,9",
                this.redImage.sizeGrid = "11,11,9,9",
                this.bgImage.width = this.hpLen,
                this.greenImage.width = this.hpLen,
                this.redImage.width = this.hpLen,
                this.bossTip = new Laya.Text,
                this.hpCountText = new Laya.Text,
                this.bossTip.fontSize = 25,
                this.hpCountText.fontSize = 25,
                this.bossTip.color = "#FFFFFF",
                this.hpCountText.color = "#FFFFFF",
                this.bossTip.stroke = 3,
                this.bossTip.strokeColor = "#000000",
                this.hpCountText.stroke = 3,
                this.hpCountText.strokeColor = "#000000",
                this.bossTip.pos(220, 118),
                this.hpCountText.pos(525, 118),
                this.hpCountText.width = 100,
                this.hpCountText.align = "right",
                u.Language == h.EN ? this.bossTip.text = "Leader" : this.bossTip.text = "首领",
                this.hpCountText.text = "X " + this.hpCount,
                this.parent.addChild(this.bgImage),
                this.parent.addChild(this.greenImage),
                this.parent.addChild(this.redImage),
                this.parent.addChild(this.bossTip),
                this.parent.addChild(this.hpCountText),
                this.bgImage.pos(201, 107),
                this.greenImage.pos(201, 107),
                this.redImage.pos(201, 107)
        }
        showQueueHp() {
            if (!this.hpEffing) {
                this.hpEffing = !0;
                let t = this.subHpQueue.shift();
                t ? (this.currSubHp = t, this.subHp += t, this.subHpCount = Math.floor(t / this.hp), e.l("boss 血量==== > " + this.fullHp + " --- subHp : " + this.subHp + " --- hp : " + t + " --- this.hpCount : " + this.hpCount), this.subInterval = 200 / this.subHpCount, this.subHpCount > 0 ? this.showHpEff() : this.subHpEff(t)) : this.hpEffing = !1
            }
        }
        SubHp(e) {
            this.currSubHpCount += e,
            this.currSubCountFlag && (this.currSubCountFlag = !1, this.subHpQueue.push(this.currSubHpCount), this.currSubHpCount = 0, this.hpEffing || this.showQueueHp(), Laya.timer.once(500, this, () => {
                this.currSubCountFlag = !0
            }))
        }
        callLaterSubHp(t) {
            this.currSubHpCount = 0,
                e.l("当前帧的伤害:" + t)
        }
        showHpEff() {
            let e = this.redImage;
            this.hpCountText.text = "X " + this.hpCount,
                this.hpCount > 0 && this.subHpCount > 0 ? (this.hpCount--, this.subHpCount--, e.width = this.hpLen, Laya.Tween.to(e, {
                    width: 0
                }, this.subInterval, null, Laya.Handler.create(this, this.showHpEff))) : this.subHpEff(this.currSubHp)
        }
        subHpEff(e) {
            let t = this.subHp / this.hp;
            t = 1 - (t - Math.floor(t)),
                this.hpCount = Math.floor((this.fullHp - this.subHp) / this.hp),
                this.hpCount <= 0 ? this.hpCountText.text = "0" : this.hpCountText.text = "X " + this.hpCount,
                this.subHp >= this.fullHp ? (this.redImage.visible = !1, Laya.Tween.to(this.greenImage, {
                    width: 0
                }, 200, null, Laya.Handler.create(this, () => {
                    this.parent.removeChildren(),
                    this.boss && !this.boss.hasDie() && this.boss.die()
                })), this.hpEffing = !0, this.hpCountText.visible = !1) : 0 == this.hpCount ? (this.redImage.visible = !1, Laya.Tween.to(this.greenImage, {
                    width: this.hpLen * t
                }, 200, null, Laya.Handler.create(this, this.callBack))) : (this.redImage.width < this.hpLen * t && (this.redImage.width = this.hpLen), Laya.Tween.to(this.redImage, {
                    width: this.hpLen * t
                }, 200, null, Laya.Handler.create(this, this.callBack)))
        }
        callBack() {
            this.hpEffing = !1,
                this.showQueueHp()
        }
    }
    class Ue extends A {
        onAwake() {
            super.onAwake(),
                this.humanClass = 15,
                this.bossHpBar = new Oe,
                this.bg = this.owner.getChildByName("click_bg"),
            this.enemyTemp || (this.enemyTemp = new Laya.Templet, this.enemyTemp.loadAni(s.REQUIRE_SK_URL + "enemy_sp/Blaster_boss.sk"), this.enemyTemp.on(Laya.Event.COMPLETE, this, this.enemyLoadSuccess)),
                this.bg.on(Laya.Event.CLICK, this, this.touchAtkSelf)
        }
        initHumanAtt() {
            this.enemyOutDis = -1,
                this.hurtEffType = 1,
                this.hurtEffGapX = 0,
                this.hurtEffGapY = -240,
                this.hurtEffGapRota = -30,
                this.hurtNumY = -240
        }
        getSite() {
            return {
                x: this.humanSp.x,
                y: this.humanSp.y - 240
            }
        }
        hurtEffGameUI(e) {
            this.bossHpBar.SubHp(e)
        }
        creatChildCommonMans() {}
        enemyLoadSuccess() {
            this.enemy = this.enemyTemp.buildArmature(0),
                this.dieInterval = this.enemyTemp.getAniDuration(2),
                this.atkLisenter(),
                this.owner.addChild(this.enemy),
                this.enemy.play("stay", !0)
        }
        addBossIcon(e) {}
        addHurtIcon() {}
        shootAnim() {
            this.enemy.play("attack", !1),
                o.playBossSound("Blaster_atk")
        }
        hurtListener(t) {
            _.Dispatch(g.BossHpBar, !0),
                this.bossHpBar.init(this.fullHp, t, Le.Instance.bossHpBox, this),
                e.l("boss被攻击了"),
                _.Dispatch(g.CreateEnemyClass, c.SpecialEnemy.FLY_MAN_ENEMY, this.humanSp.x, this.humanSp.y);
            let s = X.Instance.getGlobalConfigInfo().BossSK_BlasterTime;
            Laya.timer.loop(s, this, () => {
                this.isDie || _.Dispatch(g.CreateEnemyClass, c.SpecialEnemy.FLY_MAN_ENEMY, this.humanSp.x, this.humanSp.y)
            })
        }
        specialDie() {
            _.Dispatch(g.BossHpBar, !1),
                this.enemy.play("dead", !1),
                Laya.timer.once(this.dieInterval, this, () => {
                    this.owner.removeSelf()
                }),
                _.Dispatch(g.EnemyDie, this.getSite(), this.name)
        }
        atkEnemy() {}
        onDisable() {
            let e = Laya.loader.getRes(s.REQUIRE_SK_URL + "enemy_sp/Blaster_boss.png");
            e && e.disposeBitmap(),
                Laya.loader.clearRes(s.REQUIRE_SK_URL + "enemy_sp/Blaster_boss.sk"),
                Laya.loader.clearRes(s.REQUIRE_SK_URL + "enemy_sp/Blaster_boss.png"),
            this.enemy && this.enemy.removeSelf(),
                this.enemy.destroy(!0),
                this.enemy = null,
                this.enemyTemp.destroy(),
                this.enemyTemp = null,
                Laya.timer.clearAll(this)
        }
    }
    class Fe extends A {
        constructor() {
            super(...arguments),
                this.dieInterval = 0
        }
        onAwake() {
            super.onAwake(),
                this.humanClass = 12,
                this.bossHpBar = new Oe,
            this.enemyTemp || (this.enemyTemp = new Laya.Templet, this.enemyTemp.loadAni(s.REQUIRE_SK_URL + "enemy_sp/Bunker_boss.sk"), this.enemyTemp.on(Laya.Event.COMPLETE, this, this.loadEnemyTempSuccess))
        }
        initHumanAtt() {
            this.enemyOutDis = -20,
                this.firstHurt = !0,
                this.hurtEffType = 1,
                this.hurtEffGapX = 0,
                this.hurtEffGapY = -30,
                this.hurtEffGapRota = -60
        }
        loadEnemyTempSuccess() {
            this.enemy = this.enemyTemp.buildArmature(0),
                this.atkLisenter(),
                this.owner.addChild(this.enemy),
                this.enemy.play("stay", !0),
                this.dieInterval = this.enemyTemp.getAniDuration(2)
        }
        atkEnemy() {}
        creatChildCommonMans() {}
        addBossIcon(e) {}
        addHurtIcon() {}
        resetInfo() {}
        shootAnim() {
            this.enemy.play("attack", !1),
                o.playBossSound("Bunker_atk")
        }
        hurtEffGameUI(e) {
            this.bossHpBar.SubHp(e)
        }
        hurtListener(e) {
            n.l("boss被攻击了"),
                _.Dispatch(g.BossHpBar, !0),
                this.bossHpBar.init(this.fullHp, e, Le.Instance.bossHpBox, this),
                _.Dispatch(g.CreateEnemyClass, c.SpecialEnemy.COMMON_ENEMY, this.humanSp.x, this.humanSp.y);
            let t = X.Instance.getGlobalConfigInfo().BossSK_BunkerTime;
            Laya.timer.loop(t, this, () => {
                this.isDie || _.Dispatch(g.CreateEnemyClass, c.SpecialEnemy.COMMON_ENEMY, this.humanSp.x, this.humanSp.y)
            })
        }
        specialDie() {
            _.Dispatch(g.BossHpBar, !1),
                this.enemy.play("dead", !1),
                Laya.timer.once(this.dieInterval, this, () => {
                    this.owner.removeSelf()
                }),
                _.Dispatch(g.EnemyDie, this.getSite(), this.name)
        }
        onDisable() {
            Laya.timer.clearAll(this);
            let e = Laya.loader.getRes(s.REQUIRE_SK_URL + "Bunker_boss.png");
            e && e.disposeBitmap(),
                Laya.loader.clearRes(s.REQUIRE_SK_URL + "enemy_sp/Bunker_boss.sk"),
                Laya.loader.clearRes(s.REQUIRE_SK_URL + "enemy_sp/Bunker_boss.png"),
            this.enemyTemp && (this.enemy.removeSelf(), this.enemy.destroy(!0), this.enemy = null, this.enemyTemp.destroy(), this.enemyTemp = null)
        }
    }
    class He extends A {
        constructor() {
            super(...arguments),
                this.hpLv = 1,
                this.moveTargets = [{
                    x: 1e3,
                    y: 500
                }, {
                    x: 1300,
                    y: 300
                }, {
                    x: 1e3,
                    y: 100
                }
                ],
                this.moveIndex = 0,
                this.dieInterval = 0,
                this.subHpLv = .2
        }
        onAwake() {
            super.onAwake(),
                this.humanClass = 11,
                this.bossHpBar = new Oe,
                this.subHpLv = X.Instance.getGlobalConfigInfo().BossSK_LancerHP,
            this.enemyTemp || (this.enemyTemp = new Laya.Templet, this.enemyTemp.on(Laya.Event.COMPLETE, this, this.loadEnemyTempComplete), this.enemyTemp.loadAni(s.REQUIRE_SK_URL + "enemy_sp/Lancer_boss.sk"))
        }
        initHumanAtt() {
            this.enemyOutDis = -1,
                this.moveIndex = 0,
                this.hpLv = 1,
                this.direction = 1
        }
        changeEnemySkin(e, t, s, i) {}
        getSite() {
            return {
                x: this.humanSp.x,
                y: this.humanSp.y
            }
        }
        loadEnemyTempComplete() {
            this.enemy = this.enemyTemp.buildArmature(0),
                this.owner.addChild(this.enemy),
                this.enemy.pos(75, 170),
                this.enemy.play("stay", !0),
                this.dieInterval = this.enemyTemp.getAniDuration(3)
        }
        hurtListener(e) {
            n.i("飞碟被攻击了"),
                _.Dispatch(g.BossHpBar, !0),
                this.bossHpBar.init(this.fullHp, e, Le.Instance.bossHpBox, this)
        }
        hurtEffGameUI(e) {
            this.bossHpBar.SubHp(e)
        }
        addMoveTarget(e) {
            for (let t = 1; t < e.length; t++) {
                let s = t - 1,
                    i = e[t];
                for (; i > e[s] && s >= 0; )
                    e[s + 1] = e[s], s--;
                s != t - 1 && (e[s + 1] = i)
            }
            e.shift();
            for (let t = 0; t < e.length; t++) {
                const s = e[t];
                s.x -= 100,
                    s.y -= 20
            }
            this.moveTargets = e
        }
        initHurtAtt() {
            let e = this.hp / this.fullHp,
                t = 3 * this.subHpLv + .1;
            if (this.hpLv - e >= this.subHpLv && this.hpLv > t) {
                this.enemy.play("jump", !1),
                    Laya.timer.clearAll(this),
                    this.hpLv -= this.subHpLv;
                let e = 0;
                this.moveTargets[this.moveIndex].x < this.humanSp.x && (e = 1),
                    this.direction++,
                    this.direction = this.direction > 3 ? 3 : this.direction,
                    b.bombTrack(this.humanSp, this.moveTargets[this.moveIndex], 0, this.resetShootHuman.bind(this), 200, e, 150),
                    this.moveIndex++
            }
        }
        creatChildCommonMans() {}
        addBossIcon(e) {}
        addHurtIcon() {}
        resetInfo() {}
        resetShootHuman() {
            this.atkTarget(this.atkHuman),
                _.Dispatch(g.ChangePlayerAtkTarget, this)
        }
        shootAnim() {
            n.i("当前的射击动画 :" + this.direction),
                this.enemy.play("attack_" + this.direction, !0),
                o.playBossSound("Lancer_atk")
        }
        specialDie() {
            _.Dispatch(g.EnemyDie, this.getSite(), this.name),
                this.enemy.play("dead", !0),
                Laya.timer.once(this.dieInterval, this, () => {
                    this.owner.removeSelf()
                }),
                _.Dispatch(g.BossHpBar, !1)
        }
        onDisable() {
            Laya.timer.clearAll(this);
            let e = Laya.loader.getRes(s.REQUIRE_SK_URL + "Lancer_boss.png");
            e && e.disposeBitmap(),
                Laya.loader.clearRes(s.REQUIRE_SK_URL + "enemy_sp/Lancer_boss.sk"),
                Laya.loader.clearRes(s.REQUIRE_SK_URL + "enemy_sp/Lancer_boss.png"),
            this.enemyTemp && (this.enemy.removeSelf(), this.enemy.destroy(!0), this.enemy = null, this.enemyTemp.destroy(), this.enemyTemp = null)
        }
    }
    class Ke extends A {
        constructor() {
            super(...arguments),
                this.dieInterval = 0,
                this.atkInterval = 0
        }
        onAwake() {
            super.onAwake(),
                this.humanClass = 15,
                this.bossHpBar = new Oe,
            this.enemyTemp || (this.enemyTemp = new Laya.Templet, this.enemyTemp.on(Laya.Event.COMPLETE, this, this.loadEnemyTempComplete), this.enemyTemp.loadAni(s.REQUIRE_SK_URL + "enemy_sp/Rebel_boss.sk"))
        }
        initHumanAtt() {
            this.enemyOutDis = -1,
                this.firstHurt = !0,
                this.hurtEffType = 1,
                this.hurtEffGapX = 0,
                this.hurtEffGapY = -30,
                this.hurtEffGapY = -45
        }
        loadEnemyTempComplete() {
            this.enemy = this.enemyTemp.buildArmature(0),
                this.atkLisenter(),
                this.owner.addChild(this.enemy),
                this.enemy.pos(250, 600),
                this.enemy.play("stay", !0),
                this.dieInterval = this.enemyTemp.getAniDuration(3),
                this.atkInterval = this.enemyTemp.getAniDuration(2)
        }
        atkEnemy() {}
        changeEnemySkin(e, t, s, i) {}
        creatChildCommonMans() {}
        addBossIcon(e) {}
        addHurtIcon() {}
        resetInfo() {}
        hurtListener(e) {
            _.Dispatch(g.BossHpBar, !0),
                this.bossHpBar.init(this.fullHp, e, Le.Instance.bossHpBox, this),
                console.error("boss被攻击了" + this.fullHp),
                _.Dispatch(g.CreateEnemyClass, c.SpecialEnemy.BOMB_SELF_ENEMY, this.humanSp.x, this.humanSp.y);
            let t = X.Instance.getGlobalConfigInfo().BossSK_RebelTime;
            Laya.timer.loop(t, this, () => {
                this.isDie || _.Dispatch(g.CreateEnemyClass, c.SpecialEnemy.BOMB_SELF_ENEMY, this.humanSp.x, this.humanSp.y)
            })
        }
        hurtEffGameUI(e) {
            this.bossHpBar.SubHp(e)
        }
        shootAnim() {
            this.enemy.play("attack", !1),
                o.playBossSound("Rebel_atk"),
                Laya.timer.once(this.atkInterval, this, () => {
                    this.enemy.play("stay", !1)
                })
        }
        getRect() {
            let e = {};
            return e.x = this.humanSp.x - this.humanSp.pivotX,
                e.y = this.humanSp.y - this.humanSp.pivotY,
                e.width = 500,
                e.height = 600,
                e
        }
        specialDie() {
            _.Dispatch(g.EnemyDie, this.getSite(), this.name),
                this.enemy.play("dead", !0),
                Laya.timer.once(this.dieInterval, this, () => {
                    this.owner.removeSelf()
                }),
                _.Dispatch(g.BossHpBar, !1)
        }
        onDisable() {
            Laya.timer.clearAll(this);
            let e = Laya.loader.getRes(s.REQUIRE_SK_URL + "Rebel_boss.png");
            e && e.disposeBitmap(),
                Laya.loader.clearRes(s.REQUIRE_SK_URL + "enemy_sp/Rebel_boss.sk"),
                Laya.loader.clearRes(s.REQUIRE_SK_URL + "enemy_sp/Rebel_boss.png"),
            this.enemyTemp && (this.enemy.removeSelf(), this.enemy.destroy(!0), this.enemy = null, this.enemyTemp.destroy(), this.enemyTemp = null)
        }
    }
    class je extends A {
        constructor() {
            super(...arguments),
                this.dieSKInterval = 0,
                this.openWeaknessCount = 0
        }
        onAwake() {
            super.onAwake(),
                this.humanClass = 13;
            let e = X.Instance.getGlobalConfigInfo();
            if (this.weaknessSubHp = e.BossSK_RugHP, this.weaknessInterval = e.BossSK_RugTime, this.bossHpBar = new Oe, this.bg = this.owner.getChildByName("click_bg"), !this.weaknessPrefab) {
                this.weaknessPrefab = new Laya.Prefab,
                    this.weaknessPrefab.json = Laya.loader.getRes("prefabs/Enemy/RugWeakness.json"),
                    this.weakness = [];
                for (let e = 0; e < 3; e++) {
                    let t = this.weaknessPrefab.create();
                    this.owner.addChild(t),
                        t.pos(150 * (e - 1) - 50, -204),
                        t.zOrder = 1,
                        this.weakness[e] = t.getComponent(Q)
                }
            }
            this.enemyTemp || (this.enemyTemp = new Laya.Templet, this.enemyTemp.loadAni(s.REQUIRE_SK_URL + "enemy_sp/Rug_boss.sk"), this.enemyTemp.on(Laya.Event.COMPLETE, this, this.enemyLoadSuccess), this.enemyDieTemp = new Laya.Templet, this.enemyDieTemp.loadAni(s.REQUIRE_SK_URL + "enemy_sp/Rug_boss_dead.sk"), this.enemyDieTemp.on(Laya.Event.COMPLETE, this, this.enemyDieSuccess)),
                this.bg.on(Laya.Event.CLICK, this, this.touchAtkSelf)
        }
        init(e, t, s, i, a, n, o, h = !1) {
            this.fullHp = e,
                this.hp = e,
                this.atk = t,
                this.shoot_speed = s,
                this.defend = i,
                this.isShoot = !1,
                this.weaponType = a,
                this.isDie = !1,
                this.autoFire = n,
                this.humanType = o,
                this.needRecover = h,
                this.autoFire
        }
        initHumanAtt() {
            this.hurtEffType = 1,
                this.hurtEffGapRota = -60,
                this.hurtEffGapX = 0,
                this.hurtEffGapY = -30,
                this.firstHurt = !0,
                this.enemyOutDis = -1,
                _.AddListener(g.BossWeaknessDead, this, this.weaknessDie)
        }
        weaknessDie() {
            let e = Math.floor(this.fullHp * this.weaknessSubHp);
            this.subHp(e)
        }
        shootAnim() {
            this.enemy.play("attack", !1),
                o.playBossSound("Rug_atk")
        }
        addBossIcon(e) {}
        addHurtIcon() {}
        changeEnemySkin(e, t, s, i) {}
        clickWeaknessSk() {}
        atkEnemy() {}
        hurtListener(e) {
            n.i("飞碟被攻击了"),
                _.Dispatch(g.BossHpBar, !0),
                this.bossHpBar.init(this.fullHp, e, Le.Instance.bossHpBox, this),
                this.weakness.forEach(e => {
                    e.init(this.fullHp / 8)
                }),
                Laya.timer.loop(this.weaknessInterval, this, this.openWeakness)
        }
        hurtEffGameUI(e) {
            this.bossHpBar.SubHp(e)
        }
        openWeakness() {
            if (this.isDie)
                return void Laya.timer.clear(this, this.openWeakness);
            let e = 0;
            for (let t = 0; t < this.weakness.length; t++)
                this.weakness[t].isOpen && e++;
            if (!(e >= 2))
                for (let e = 0; e < this.weakness.length; e++) {
                    const t = this.weakness[e];
                    if (!t.isOpen) {
                        t.openWeakness();
                        break
                    }
                }
        }
        enemyDieSuccess() {
            this.enemyDieSk = this.enemyDieTemp.buildArmature(0),
                this.dieSKInterval = this.enemyDieTemp.getAniDuration(0)
        }
        enemyLoadSuccess() {
            this.enemy = this.enemyTemp.buildArmature(0),
                this.atkLisenter(),
                this.owner.addChild(this.enemy),
                this.enemy.play("stay", !0)
        }
        specialDie() {
            _.Dispatch(g.BossHpBar, !1),
                this.weakness.forEach(e => {
                    e.weaknessHide()
                }),
                this.owner.addChild(this.enemyDieSk),
                this.enemyDieSk.play(0, !1),
                Laya.timer.once(this.dieSKInterval, this, () => {
                    this.enemyDieSk.removeSelf(),
                        this.owner.removeSelf()
                }),
                _.Dispatch(g.EnemyDie, this.getSite(), this.name)
        }
        onDisable() {
            Laya.timer.clearAll(this);
            let e = Laya.loader.getRes(s.REQUIRE_SK_URL + "Rug_boss.png");
            e && e.disposeBitmap(),
                Laya.loader.clearRes(s.REQUIRE_SK_URL + "enemy_sp/Rug_boss.sk"),
                Laya.loader.clearRes(s.REQUIRE_SK_URL + "enemy_sp/Rug_boss.png"),
            this.enemyTemp && (this.enemy.removeSelf(), this.enemy.destroy(!0), this.enemy = null, this.enemyTemp.destroy(), this.enemyTemp = null, this.enemyDieSk.removeSelf(), this.enemyDieTemp = null),
                this.weaknessPrefab = null,
                _.RemoveListener(g.BossWeaknessDead, this, this.weaknessDie)
        }
    }
    class We {
        constructor() {
            this.names = "",
                this.openTreasureInfo = []
        }
        static get Instance() {
            return null != this.instance && null != this.instance || (this.instance = new We),
                this.instance
        }
        get Names() {
            return this.names
        }
        set Names(e) {
            this.names = e
        }
        commonShop(e) {
            let t,
                s,
                i = X.Instance.getGlobalConfigInfo(),
                a = i.BuyRank_Max,
                n = i.BuyRank_Min,
                o = B.Instance.getMaxWeapon()()[e],
                h = B.Instance.weapon_shop_count[e][o - 1],
                r = C.Instance.getItemConfig()[e];
            if (o <= a)
                return s = r[o - 1].ItemCost_GrowUp, t = Math.floor(r[o - 1].Item_Cost * Math.pow(s, h)), this.weapon_scope_max = o, [o, t]; {
                n = (n = o - (a = o - a) - n) > 0 ? n : 1,
                    this.weapon_scope_max = a;
                let i = a;
                for (; i >= n; ) {
                    if (s = r[i - 1].ItemCost_GrowUp, h = B.Instance.weapon_shop_count[e][i - 1], t = Math.floor(r[i - 1].Item_Cost * Math.pow(s, h)), X.Instance.gold >= t)
                        return [i, t];
                    i--
                }
                return s = r[a - 1].ItemCost_GrowUp,
                    h = B.Instance.weapon_shop_count[e][a - 1],
                    [a, t = Math.floor(r[a - 1].Item_Cost * Math.pow(s, h))]
            }
        }
        get Weapon_scope_max() {
            return this.weapon_scope_max
        }
        getTreasureData(e) {
            let t = X.Instance.getTreasureOpenWeaponNum(e);
            this.openTreasureInfo = [];
            let s = Math.floor(Math.random() * (t[1] - t[0]) + t[0]) % 6;
            for (let e = 0; e < s; e++) {
                let e = Math.floor(3 * Math.random());
                this.getWeaponIndexTreasureData(e)
            }
            this.getTreasureGold()
        }
        getTreasureInfo() {
            return this.openTreasureInfo
        }
        setTreasureInfo(e) {
            this.openTreasureInfo = e
        }
        getTreasureGold() {
            let e = X.Instance.getGoldEarningSecond();
            We.instance.openTreasureInfo.push([4, e])
        }
        getWeaponIndexTreasureData(e) {
            let t,
                s,
                i = X.Instance.getGlobalConfigInfo(),
                a = i.SBoxRank_Max,
                n = i.SBoxRank_Min,
                o = B.Instance.getMaxWeapon()()[e],
                h = C.Instance.getItemConfig()[e];
            if (o <= a)
                s = [(t = h[o - 1]).Item_Type, o, t.Item_BGColor], this.openTreasureInfo.push(s);
            else {
                n = (n = o - (a = o - a) - n) > 0 ? n : 1;
                let e = Math.floor(Math.random() * (a - n)) + n;
                s = [(t = h[e - 1]).Item_Type, e, t.Item_BGColor],
                    this.openTreasureInfo.push(s)
            }
        }
    }
    class Ve extends Laya.Script {
        onAwake() {
            this.imgSelf = this.owner,
                this.level_tip = this.owner.getChildByName("level"),
                this.equit = this.owner.getChildByName("equit"),
                this.gun = this.owner.getChildByName("gun"),
                this.level_bg = this.owner.getChildByName("level_bg")
        }
        onEnable() {
            this.compose_sk || (this.compose_sk = m.Instance.getSkeleton("compose_tips"), this.owner.addChild(this.compose_sk), this.compose_sk.pos(63, 63), this.compose_sk.visible = !1)
        }
        init(e, t, s = !1) {
            this.compose_sk.visible = !1,
                this.equit.visible = s,
                this.level_tip.text = t + "",
                this.gun.skin = "icon/" + We.Instance.Names + "_" + t + ".png";
            let i = C.Instance.getItemConfig()[e][t - 1].Item_BGColor;
            this.level_bg.skin = "item/item_level_mark_" + i + ".png",
                this.imgSelf.skin = "item/item_level_" + i + ".png"
        }
        initTreasureItem(e, t, i = !1) {
            this.equit.visible = i,
                this.level_tip.text = t + "",
                this.gun.skin = "icon/" + s.ITEM_NAMES[e] + t + ".png";
            let a = C.Instance.getItemConfig()[e][t - 1].Item_BGColor;
            this.level_bg.skin = "item/item_level_mark_" + a + ".png",
                this.imgSelf.skin = "item/item_level_" + a + ".png"
        }
        showEquit(e = !0) {
            this.equit.visible = e
        }
        showMinWeaponComposeTip(e) {
            this.compose_sk.visible = e,
            e && this.compose_sk.play(0, !0)
        }
        showComponseTip2() {
            m.Instance.addCompseTip2(this.owner, 63, 63)
        }
        onDisable() {
            super.onDisable()
        }
    }
    class Ye extends A {
        constructor() {
            super(...arguments),
                this.index = 0,
                this.type = 0
        }
        shootAnim() {
            this.armoureSk.play("attack", !1)
        }
        initHumanAtt() {
            this.hurtIconPosX = 7,
                this.hurtIconPosY = -150,
                this.hurtEffType = 1
        }
        changeEnemySkin(e, t, i, a) {
            if (m.Instance.getTempletLoadOver()) {
                switch (this.enemy_name = this.name.split("_")[0], this.enemy_name) {
                    case "tank":
                        this.index = 0,
                        this.armoureTemp || (this.dieTemp = new Laya.Templet, this.dieTemp.loadAni(s.REQUIRE_SK_URL + "tank_destroyed.sk"), this.dieTemp.on(Laya.Event.COMPLETE, this, this.tankDieSuccess), this.armoureTemp = new Laya.Templet, this.armoureTemp.loadAni(s.REQUIRE_SK_URL + "tank.sk"), this.armoureTemp.on(Laya.Event.COMPLETE, this, this.armoureSuccess)),
                            this.type = 0;
                        break;
                    case "helicopter":
                        this.index = 1,
                            this.type = 1,
                        this.armoureTemp || (this.armoureTemp = new Laya.Templet, this.armoureTemp.loadAni(s.REQUIRE_SK_URL + "helicopter.sk"), this.armoureTemp.on(Laya.Event.COMPLETE, this, this.armoureSuccess))
                }
                this.direction = e,
                    this.initSk = !0
            }
        }
        tankDieSuccess() {
            this.dieSk = this.dieTemp.buildArmature(0),
                this.owner.addChild(this.dieSk),
                this.dieSk.pos(0, 0)
        }
        armoureSuccess() {
            this.armoureSk = this.armoureTemp.buildArmature(0),
                this.owner.addChild(this.armoureSk),
                this.armoureSk.pos(0, 0);
            this.armoureSk.play("stay", !0)
        }
        addBossIcon(e) {
            this.icon = new Laya.Sprite;
            let t = -219;
            switch ("tank" == this.enemy_name && (t = -188), e) {
                case 3:
                    this.icon.loadImage("battle/enemy_icon_1.png"),
                        this.icon.name = "icon",
                        this.owner.addChild(this.icon),
                        this.icon.pos(-118, t);
                    break;
                case 5:
                    this.icon.loadImage("battle/enemy_icon_2.png"),
                        this.icon.name = "icon",
                        this.owner.addChild(this.icon),
                        this.icon.pos(-118, t)
            }
        }
        initHurtAtt() {
            let e = 0,
                t = 0;
            1 == this.index && (e = -35, t = 100),
                this.hurtEffGapX = -100,
                this.hurtEffGapY = t - 41,
                this.hurtEffGapRota = e
        }
        specialDie() {
            this.dieSk && this.dieSk.play(0, !1),
                _.Dispatch(g.EnemyDie, this.getSite(), this.name),
                this.armoureSk.play("destroyed", !1)
        }
        onDisable() {
            let e = Laya.loader.getRes(s.REQUIRE_SK_URL + "tank_destroyed.png");
            e && e.disposeBitmap(),
            (e = Laya.loader.getRes(s.REQUIRE_SK_URL + "tank.png")) && e.disposeBitmap(),
            (e = Laya.loader.getRes(s.REQUIRE_SK_URL + "helicopter.png")) && e.disposeBitmap(),
                Laya.loader.clearRes(s.REQUIRE_SK_URL + "tank_destroyed.sk"),
                Laya.loader.clearRes(s.REQUIRE_SK_URL + "tank_destroyed.png"),
                Laya.loader.clearRes(s.REQUIRE_SK_URL + "tank.sk"),
                Laya.loader.clearRes(s.REQUIRE_SK_URL + "tank.png"),
                Laya.loader.clearRes(s.REQUIRE_SK_URL + "helicopter.sk"),
                Laya.loader.clearRes(s.REQUIRE_SK_URL + "helicopter.png"),
            this.dieTemp && (this.dieSk && (this.dieSk.removeSelf(), this.dieSk.destroy(!0), this.dieSk = null), this.dieTemp.destroy(), this.dieTemp = null),
            this.armoureTemp && (this.armoureSk && (this.armoureSk.removeSelf(), this.armoureSk.destroy(!0), this.armoureSk = null), this.armoureTemp.destroy(), this.armoureTemp = null)
        }
    }
    class qe extends A {
        constructor() {
            super(...arguments),
                this.type = 0
        }
        shoot() {
            if (!(Le.Instance.go_over && this.isDie || (this.shootAnim(), null === this.atkHuman || null === this.atkHuman))) {
                switch (this.name.split("_")[0]) {
                    case "bomb":
                        this.createBombBullet();
                        break;
                    case "rpgman":
                        this.createRokectBullet()
                }
            }
        }
        createRokectBullet() {
            let e = this.getSite(),
                t = this.atkHuman.getSite(),
                s = (Le.Instance.level_curr_len, Math.abs((e.y - t.y) / (e.x - (t.x - Le.Instance.level_curr_len)))),
                i = Math.atan(s) / (Math.PI / 180);
            o.playSkillSound("rocket"),
                R.Instance.createBulletToBulletGroup(0, this.getSite(), this.atk, 20, this.atkHuman, -i)
        }
        createBombBullet() {
            let e = null;
            e = m.Instance.getSkeleton("bomb_man_bomb"),
                Le.Instance.bulletGroup.addChild(e),
                e.play(0, !0),
                e.pos(this.humanSp.x - 45, this.humanSp.y - 46);
            let t = this.atkHuman.getSite();
            t.x -= Le.Instance.level_curr_len,
                b.bombTrack(e, t, 0, () => {}, 200, 1, 0),
                this.bulltFunc = function () {
                    if (this.isDie)
                        return void(e && (m.Instance.cycleSkeleton("bomb_man_bomb", e), e.removeSelf()));
                    let t = this.atkHuman.getSite();
                    m.Instance.addSkillEffSk(Le.Instance.effGroup, t.x - Le.Instance.level_curr_len, t.y, !1),
                        o.playSceneSound("bomb"),
                        this.atkHuman.subHp(this.atk),
                        m.Instance.cycleSkeleton("bomb_man_bomb", e),
                        e.removeSelf()
                }
                    .bind(this),
                Laya.timer.once(400, this, this.bulltFunc)
        }
        shootProgressCreate() {
            this.shootBar = new Laya.ProgressBar("battle/rpg_rate.png"),
                this.owner.addChild(this.shootBar),
                this.shootBar.sizeGrid = "0,10,0,11",
                this.shootBar.width = 100,
                this.shootBar.pos(-31, -75),
                this.shootBar.value = 0
        }
        shootAnim() {
            0 == this.type ? this.enemy.play("attack", !1) : this.enemy.play("attack" + (this.direction + 1), !1)
        }
        changeEnemySkin(e, t, s, i) {
            if (m.Instance.getTempletLoadOver()) {
                let t = 0,
                    s = "stay";
                this.enemy_name = this.name.split("_")[0];
                let i = "";
                switch (this.enemy_name) {
                    case "bomb":
                        i = "bomb_man",
                            t = 0,
                            s = "stay",
                            this.type = 0;
                        break;
                    case "rpgman":
                        i = "rpg_man",
                            t = 1,
                            s = "stay" + (e + 1),
                            this.humanClass = 7,
                            this.type = 1,
                            this.atk *= 3,
                            this.hp *= .75,
                            this.fullHp = this.hp,
                            this.shoot_speed[3] *= 3,
                            this.shootProgressCreate()
                }
                this.direction = e,
                    this.enemy = m.Instance.getSkeleton(i),
                    this.owner.addChild(this.enemy),
                    this.enemy.play(s, !0),
                    this.initSk = !0;
                let a = 42;
                0 == t && (a = 20),
                    this.enemy.pos(a, 121)
            }
        }
        specialDie() {
            _.Dispatch(g.EnemyDie, this.getSite(), this.name);
            let e = 42;
            "bomb" == this.enemy_name && (e = 20);
            let t = this.humanSp.x + e,
                s = this.humanSp.y;
            _.Dispatch(g.AddEnemyDie, t, s),
                Laya.timer.once(80, this, () => {
                    this.owner.removeSelf(),
                    this.bulltFunc && this.bulltFunc(),
                        this.recoverSK = !0
                })
        }
        atkTarget(e) {
            Laya.timer.clear(this, this.shootLoop),
                this.atkHuman = e,
            1 == this.type && (this.shootBar.value = 0, Laya.Tween.to(this.shootBar, {
                value: 1
            }, this.shoot_speed[3])),
                Laya.timer.loop(this.shoot_speed[3], this, this.shootLoop)
        }
        shootLoop() {
            1 == this.type && (this.shootBar.value = 0, Laya.Tween.to(this.shootBar, {
                value: 1
            }, this.shoot_speed[3])),
                super.shootLoop()
        }
        onDisable() {
            Laya.timer.clearAll(this),
                this.enemy.removeSelf();
            let e = "";
            switch (this.enemy_name) {
                case "bomb":
                    e = "bomb_man";
                    break;
                case "rpgman":
                    e = "rpg_man"
            }
            m.Instance.cycleSkeleton(e, this.enemy)
        }
    }
    class Xe extends Laya.Script {
        onAwake() {
            this.ownerSprite = this.owner,
                this.getChildren()
        }
        onEnable() {
            this.addListener(),
                this.initView()
        }
        onDisable() {
            this.removeListener(),
                Laya.timer.clearAll(this),
                Laya.Tween.clearAll(this)
        }
        getChildren() {}
        addListener() {}
        initView() {}
        removeListener() {}
        get OwnerSprite() {
            return this.ownerSprite
        }
    }
    class Qe extends Xe {
        setData(e) {
            this.owner.active = !0,
                this.params = e,
            this.initOver && this.initView()
        }
        closeSelf() {
            this.owner.scale(1, 1),
                X.Instance.PauseGame ? (this.owner.removeSelf(), this.owner.active = !1, _.Dispatch(g.CloseBox, this)) : this.closeBoxEff()
        }
        closeBoxEff() {
            Laya.Tween.to(this.owner, {
                alpha: 0,
                scaleX: .6,
                scaleY: .6
            }, 120, null, Laya.Handler.create(this, () => {
                this.owner.removeSelf(),
                    this.owner.active = !1,
                    _.Dispatch(g.CloseBox, this)
            }))
        }
        onDisable() {
            super.onDisable(),
            this.params && this.params.length > 0 && t.cycleObject(this.params[0], this.owner)
        }
    }
    var ze = c.ShareConfig;
    class Je extends Qe {
        constructor() {
            super(...arguments),
                this.addTime = 200,
                this.btn_flag = !0,
                this.btn_type = "",
                this.goldMul = 0
        }
        onAwake() {
            super.onAwake()
        }
        onEnable() {
            this.setSK = m.Instance.getSkeleton("mult_gold_4"),
                this.owner.addChild(this.setSK),
                this.setSK.pos(375, 583),
                this.setSK.play(0, !0),
                _.Dispatch(g.ShowBannerAD, 2),
                this.gold_speed_info = X.Instance.getAddGoldSpeedInfo(),
                this.addTime = 60,
                B.Instance.every_day_add_speed_count[1] < this.gold_speed_info[1] ? this.btn_flag = !0 : this.btn_flag = !1,
                super.onEnable();
            B.Instance.getButtonType(ze.DOUBLE_INCOME);
            this.btn_type = s.BUTTON_TYPE_VIDEO,
                this.btnTypeIcon.loadImage("offline_speedup/video.png"),
                this.addSpeedBtn.skin = "common/button_orange.png"
        }
        addListener() {
            this.closeBtn.once(Laya.Event.CLICK, this, () => {
                o.playSceneSound("button"),
                    _.Dispatch(g.ButtonCounnt, c.GameButtonName.GOLD_SPEDD_CLOSE_BTN),
                    this.closeSelf()
            }),
                _.AddListener(g.DoubleResult, this, this.clickSpeedBtn),
                this.addSpeedBtn.on(Laya.Event.CLICK, this, this.onAddSpeedBtn)
        }
        onAddSpeedBtn() {
            var e = this;
            ye.showview(function () {
                e.btn_flag ? (_.Dispatch(g.ButtonCounnt, c.GameButtonName.GOLD_SPEED_BTN), _.Dispatch(g.ButtonClicked, "Double_income", e.btn_type, 2), o.playSceneSound("button"), e.clickSpeedBtn([!0])) : _.Dispatch(g.AppendTextTip, "收益加速次数上限", 2e3)
            })
        }
        removeListener() {
            _.RemoveListener(g.DoubleResult, this, this.clickSpeedBtn),
                this.addSpeedBtn.off(Laya.Event.CLICK, this, this.onAddSpeedBtn)
        }
        clickSpeedBtn(e) {
            let t = B.Instance;
            e[0] && t.judgeDaySharedCount(ze.DOUBLE_INCOME) ? (t.every_day_add_speed_count[1]++, t.saveEdascValue(), T.super_add_time = this.addTime, T.gold_up_speed_time = this.addTime, _.Dispatch(g.ChangeSpeedState, !1), t.add_gold_speed_time = [this.addTime, this.addTime], t.saveAddSpeed(), k.Instance.goldSpeedMul = C.Instance.getTalentConfig()[2][t.talents[2]].Talent_Value, t.shared_video_btn_count[ze.DOUBLE_INCOME]++, t.shared_video_day_count[ze.DOUBLE_INCOME]++, t.saveShardInfo(), this.closeSelf()) : e[0] && _.Dispatch(g.AppendTextTip, s.AWARD_TIP, 1500)
        }
        getChildren() {
            this.btnTypeIcon = this.owner.getChildByName("btn_type")
        }
        initView() {
            this.speedTip.text = "加速" + this.addTime + "秒"
        }
        onDisable() {
            super.onDisable(),
                _.Dispatch(g.ShowBannerAD, 0),
                this.setSK.removeSelf(),
                m.Instance.cycleSkeleton("mult_gold_4", this.setSK)
        }
    }
    var Ze = c.ShareConfig;
    class $e extends Qe {
        constructor() {
            super(...arguments),
                this.btn_type = ""
        }
        onAwake() {
            super.onAwake(),
                this.addButtonEffListener()
        }
        onEnable() {
            super.onEnable();
            let e = B.Instance.talents[1],
                t = C.Instance.getTalentConfig()[1][e].Talent_Value;
            t *= 60,
                this.time_tip.text = "离线收益最多累计" + t + "分钟",
                B.Instance.off_line_time = B.Instance.off_line_time > 60 * t ? 60 * t : B.Instance.off_line_time;
            let a = X.Instance.getLevelEarnings();
            this.award = Math.floor(a * B.Instance.off_line_time),
                this.award_tip.text = "+" + i.changeGoldUnit(this.award);
            B.Instance.getButtonType(Ze.OFFINLE_INCOME);
            this.btn_type = s.BUTTON_TYPE_VIDEO,
                this.btnTypeIcon.loadImage("offline_speedup/video.png")
        }
        getChildren() {
            this.common_award_btn = this.owner.getChildByName("common_award_btn"),
                this.super_award_btn = this.owner.getChildByName("super_award_btn"),
                this.btnTypeIcon = this.super_award_btn.getChildByName("btn_type"),
                this.award_tip = this.owner.getChildByName("award"),
                this.time_tip = this.owner.getChildByName("off_line_time")
        }
        addButtonEffListener() {
            ee.buttonEff(this.common_award_btn, this, this.closeSelf),
                ee.buttonEff(this.super_award_btn, this, this.onSuperAwardBtn)
        }
        onSuperAwardBtn() {
            console.log("离线双倍"),
                o.playSceneSound("button"),
                console.log("视频点"),
                ye.showview(function () {
                    _.Dispatch(g.OffLineResult, [!0])
                })
        }
        closeSelf() {
            o.playSceneSound("button"),
                X.Instance.gold += this.award,
                B.Instance.saveOffLineTime(),
                _.Dispatch(g.UpdateGoldMain),
                _.Dispatch(g.ButtonCounnt, c.GameButtonName.OFF_LINE_COMMON_BTN),
                super.closeSelf(),
                _.Dispatch(g.ShowGoldEff, this.award)
        }
        addListener() {
            _.AddListener(g.OffLineResult, this, this.shareResult)
        }
        removeListener() {
            _.RemoveListener(g.OffLineResult, this, this.shareResult)
        }
        shareResult(e) {
            let t = B.Instance;
            e[0] && t.judgeDaySharedCount(Ze.OFFINLE_INCOME) ? (_.Dispatch(g.ButtonCounnt, c.GameButtonName.OFF_LINE_SUPER_BTN), X.Instance.gold += 2 * this.award, B.Instance.saveOffLineTime(), _.Dispatch(g.UpdateGoldMain), super.closeSelf(), _.Dispatch(g.ShowGoldEff, 2 * this.award, 2), t.shared_video_btn_count[Ze.OFFINLE_INCOME]++, t.shared_video_day_count[Ze.OFFINLE_INCOME]++, t.saveShardInfo()) : e[0] && _.Dispatch(g.AppendTextTip, "当前功能奖励次数上限", 1500)
        }
        onDisable() {
            super.onDisable(),
                _.Dispatch(g.ShowBannerAD, 0)
        }
    }
    class et extends Qe {
        constructor() {
            super(...arguments),
                this.tip_name = ["武器", "头盔", "衣服"],
                this.treasure_index = 0,
                this.box_pos = [0, 0],
                this.first = [27, 27],
                this.interval = [200, 153],
                this.stop_index = 0
        }
        onAwake() {
            super.onAwake(),
                this.item = new Laya.Prefab,
                this.item.json = Laya.loader.getRes("prefabs/goods_item.json"),
                this.addButtonEffListener(),
                this.box_pos = [this.treasure_box.x, this.treasure_box.y],
                this.effController = Mt.getEffController()
        }
        onEnable() {
            super.onEnable(),
                _.Dispatch(g.HideSafeBox),
                se.safeBoxPoppExist = !0,
                this.weapon_full_tip.visible = !1,
                this.treasure_index = 0,
                this.openTreasure()
        }
        getChildren() {
            this.acquire_all_btn = this.owner.getChildByName("acquire_all_btn"),
                this.close_btn = this.owner.getChildByName("close_btn"),
                this.treasure_box = this.owner.getChildByName("treasure_box"),
                this.weapon_full_tip = this.owner.getChildByName("weapon_full_tip")
        }
        addListener() {
            this.close_btn.on(Laya.Event.CLICK, this, this.onCloseBtn)
        }
        removeListener() {
            this.close_btn.off(Laya.Event.CLICK, this, this.onCloseBtn)
        }
        addButtonEffListener() {
            ee.buttonEff(this.acquire_all_btn, this, this.getAllWeapon)
        }
        openTreasure() {
            this.stop_index = 0,
                this.treasure_index = 0,
                this.weapon_arr = We.Instance.getTreasureInfo(),
                Laya.timer.loop(200, this, this.createWeapon)
        }
        createWeapon() {
            if (null == this.weapon_arr[this.treasure_index] || null == this.weapon_arr[this.treasure_index])
                return Laya.timer.clear(this, this.createWeapon), !0;
            if (this.treasure_index > 4)
                return !this.createGold(this.weapon_arr[this.treasure_index], this.stop_index + 1) || (Laya.timer.clear(this, this.createWeapon), !0);
            if (this.createGold(this.weapon_arr[this.treasure_index], this.stop_index + 1))
                return Laya.timer.clear(this, this.createWeapon), this.treasure_index = 5, !0;
            let e = this.item.create(),
                t = e.getComponent(Ve),
                s = Math.floor(this.treasure_index / 3),
                i = this.first[0] + this.interval[0] * (this.treasure_index % 3) + this.box_pos[0],
                a = this.first[1] + this.interval[1] * s + this.box_pos[1];
            return _.Dispatch(g.AddEff, e, i, a),
                t.initTreasureItem(this.weapon_arr[this.treasure_index][0] - 1, this.weapon_arr[this.treasure_index][1], !1),
                this.stop_index = this.treasure_index,
                e.scale(1.5, 1.5),
                Laya.Tween.to(e, {
                    scaleX: 1,
                    scaleY: 1
                }, 250),
                this.treasure_index++,
                !1
        }
        createGold(e, t) {
            if (null != e && 4 == e[0]) {
                let s = new Laya.Image;
                s.skin = "item/item_none.png";
                let i = new Laya.Sprite;
                i.loadImage("offline_speedup/many_gold.png"),
                    s.addChild(i),
                    i.pos(14, 5);
                let a = new Laya.Text;
                a.text = "+" + e[1],
                    a.color = "#FFFFFF",
                    a.fontSize = 25,
                    s.addChild(a),
                    a.pos(60 - a.width / 2, 95);
                let n = Math.floor(t / 3),
                    o = this.first[0] + this.interval[0] * (t % 3) + this.box_pos[0],
                    h = this.first[1] + this.interval[1] * n + this.box_pos[1];
                return _.Dispatch(g.AddEff, s, o, h),
                    s.scale(1.5, 1.5),
                    Laya.Tween.to(s, {
                        scaleX: 1,
                        scaleY: 1
                    }, 250),
                    !0
            }
            return !1
        }
        getAllWeapon() {
            for (; !this.createWeapon(); );
            let e = We.Instance.getTreasureInfo(),
                t = B.Instance.knaspaceArray;
            for (let s = e.length - 1; s >= 0; s--) {
                const i = e[s];
                if (4 == i[0])
                    X.Instance.gold += i[1], e.splice(s, 1), _.Dispatch(g.ShowGoldEff, i[1]);
                else {
                    let a = t[i[0] - 1];
                    for (let n = 0; n < a.length; n++) {
                        if (0 == a[n]) {
                            t[i[0] - 1][n] = i[1],
                                e.splice(s, 1),
                                _.Dispatch(g.GetTreasure, s);
                            break
                        }
                    }
                }
            }
            if (e.length > 0) {
                let t = e[0][0] - 1;
                this.weapon_full_tip.visible = !0,
                    this.weapon_full_tip.text = this.tip_name[t] + "装备栏已满，请清理后领取",
                    We.Instance.setTreasureInfo(e),
                    _.Dispatch(g.HideEff),
                    this.openTreasure()
            } else
                this.treasure_box.removeChildren(), this.closeSelf(), se.safeBoxPoppExist = !1, _.Dispatch(g.SafeBoxGameResume), _.Dispatch(g.HideEff), _.Dispatch(g.ReSafeBoxCreate);
            B.Instance.saveTreasureFullWeapon(e),
                _.Dispatch(g.RefreshTreasure)
        }
        onCloseBtn() {
            for (super.closeSelf(); !this.createWeapon(); );
            se.safeBoxPoppExist = !1;
            let e = We.Instance.getTreasureInfo();
            B.Instance.saveTreasureFullWeapon(e),
                _.Dispatch(g.HideEff),
                _.Dispatch(g.SafeBoxGameResume),
                o.playSceneSound("button"),
                _.Dispatch(g.RefreshTreasure),
                _.Dispatch(g.ReSafeBoxCreate)
        }
    }
    class tt extends Qe {
        onEnable() {
            super.onEnable(),
                _.Dispatch(g.ShowBannerAD, 2)
        }
        addListener() {
            this.back_main_btn.on(Laya.Event.CLICK, this, this.backMainPage),
                this.resume_game_btn.on(Laya.Event.CLICK, this, this.closeSelf),
                this.close_btn.on(Laya.Event.CLICK, this, this.closeSelf)
        }
        removeListener() {
            this.back_main_btn.off(Laya.Event.CLICK, this, this.backMainPage),
                this.resume_game_btn.off(Laya.Event.CLICK, this, this.closeSelf),
                this.close_btn.off(Laya.Event.CLICK, this, this.closeSelf)
        }
        getChildren() {
            this.close_btn = this.owner.getChildByName("close_btn"),
                this.resume_game_btn = this.owner.getChildByName("resume_game_btn"),
                this.back_main_btn = this.owner.getChildByName("back_main_btn")
        }
        closeSelf() {
            super.closeSelf(),
                _.Dispatch(g.ShowBannerAD, 1),
                o.playSceneSound("button"),
                _.Dispatch(g.ResumeGame)
        }
        backMainPage() {
            super.closeSelf(),
                o.playSceneSound("button"),
                o.pauseBgMusic(),
                _.Dispatch(g.ExitGame),
                T.loadSceneIndex = 0,
                _.Dispatch(g.LoadMainUI)
        }
    }
    class st extends Qe {
        constructor() {
            super(...arguments),
                this.interval = 200,
                this.infos_index = 0,
                this.weapon_index = 0,
                this.gold_speed_unit = 0,
                this.gold_count = 0,
                this.update_count = 0
        }
        onAwake() {
            super.onAwake(),
                this.self = this.owner;
            let e = Laya.loader.getRes("prefabs/Drop_Item.json");
            this.drop_prefab = new Laya.Prefab,
                this.drop_prefab.json = e,
                this.player = m.Instance.addPlayerStandSK(this.owner, 166, 374, !1),
                this.addButtonEffListener()
        }
        onEnable() {
            super.onEnable(),
                this.weapons = [],
            null != this.player && null != this.player || (this.player = m.Instance.addPlayerStandSK(this.owner, 166, 374, !1)),
                this.get_gold.text = "0",
                Laya.timer.loop(100, this, this.updateGameGold);
            let e = X.Instance,
                t = e.judgeBossLevel();
            !e.gameResult && t && (e.super_add_gold = Math.floor(.5 * e.getLevelGold()()), e.gold += e.super_add_gold, B.Instance.saveGameGold());
            let s = e.super_add_gold;
            if (this.gold_speed_unit = Math.floor(s / 30), this.gold_count = 0, this.update_count = 0, this.infos_index = 0, this.weapon_index = 0, this.result_icon.visible = !1, this.infos)
                for (let e = 0; e < this.infos.length; e++) {
                    this.infos[e].x = -585
                }
            this.resultDataInfo(),
                this.updateResultInfo(),
                this.changePlayerSkin(),
                ye.showcustomAd()
        }
        resultDataInfo() {
            let e = function (e, t) {
                    t %= 1e3;
                    for (let s = 0; s < B.Instance.knaspaceArray[e].length; s++) {
                        if (0 == B.Instance.knaspaceArray[e][s])
                            return void(B.Instance.knaspaceArray[e][s] = t)
                    }
                    let s = C.Instance.getItemConfig()[e][t - 1].Item_Spend;
                    X.Instance.gold += s
                },
                t = X.Instance.level;
            X.Instance.gameResult && (t -= 1);
            let s = [];
            s = 1 == t ? [1001, 2001, 3001] : 2 == t ? [1001, 2001, 3001, 1001, 2001, 3001] : this.sortWeapon(),
                X.Instance.weapon_box = s;
            for (let t = 0; t < s.length; t++) {
                let i = s[t];
                e(i < 2e3 ? 0 : i < 3e3 ? 2 : 1, i)
            }
        }
        sortWeapon() {
            let e = X.Instance.weapon_box;
            for (let t = 1; t < e.length; t++) {
                let s = t - 1,
                    i = e[t] % 1e3;
                for (; i > e[s] % 1e3 && s >= 0; )
                    e[s + 1] = e[s], s--;
                s != t - 1 && (e[s + 1] = i)
            }
            return X.Instance.weapon_box = e,
                e
        }
        addListener() {
            _.AddListener(g.OverResult, this, this.sharedResult)
        }
        updateGameGold() {
            this.update_count++,
                this.gold_count += this.gold_speed_unit,
                this.get_gold.text = this.gold_count + "",
            this.update_count >= 30 && (Laya.timer.clear(this, this.updateGameGold), this.get_gold.text = i.changeGoldUnit(X.Instance.super_add_gold), X.Instance.super_add_gold = 0)
        }
        changePlayerSkin() {
            let e = B.Instance.getMaxWeapon()();
            this.player.replaceSlotSkinByIndex("head", 0, e[1] - 1),
                this.player.replaceSlotSkinByIndex("gun", 0, e[0] - 1),
                this.player.replaceSlotSkinByIndex("gun_fire", 0, e[0] - 1),
                this.player.replaceSlotSkinByIndex("cloth_out", 0, e[2] - 1),
                this.player.replaceSlotSkinByIndex("cloth", 0, e[2] - 1)
        }
        createDrops() {
            Laya.timer.loop(100, this, this.showWeaponItem)
        }
        showWeaponItem() {
            let e,
                t,
                s = X.Instance.weapon_box[this.weapon_index];
            if (!s)
                return Laya.timer.clear(this, this.showWeaponItem), void Laya.timer.once(500, this, this.createResuletIcon);
            let i = 0,
                a = "";
            if (s < 2e3 ? (i = 0, a = "gun") : s < 3e3 ? (i = 2, a = "cloth") : (i = 1, a = "helmet"), this.weapon_index > 8)
                return Laya.timer.clear(this, this.showWeaponItem), void Laya.timer.once(500, this, this.createResuletIcon);
            let n = Laya.Pool.getItemByCreateFun("drop_icon", this.drop_prefab.create, this.drop_prefab);
            this.weapons.push(n),
                this.treasure_box.addChild(n),
                t = this.weapon_index % 5,
                e = Math.floor(this.weapon_index / 5),
                n.pos(25 + 110 * t, 50 + 103 * e),
                n.getComponent(Pe).init(i, s % 1e3, a),
                n.scale(2, 2),
                Laya.Tween.to(n, {
                    scaleX: 1,
                    scaleY: 1
                }, 100),
                this.weapon_index++
        }
        createResuletIcon() {
            this.result_icon.visible = !0,
                this.result_icon.scale(1.5, 1.5),
                Laya.Tween.to(this.result_icon, {
                    scaleX: .9,
                    scaleY: .9
                }, 100, null, Laya.Handler.create(this, () => {
                    m.Instance.addSmokeAnimSK(this.owner, 540, 302, !1, 3, -45),
                        Laya.Tween.to(this.result_icon, {
                            scaleX: 1,
                            scaleY: 1
                        }, 100),
                        this.self.scale(.95, .95),
                        Laya.Tween.to(this.self, {
                            scaleX: 1,
                            scaleY: 1
                        }, 100)
                }))
        }
        getChildren() {
            this.infos = [],
                this.win_up_speed = this.owner.getChildByName("win_up_speed"),
                this.lose_btn_box = this.owner.getChildByName("lose_btn_box"),
                this.win_btn_box = this.owner.getChildByName("win_btn_box"),
                this.level_box = this.owner.getChildByName("level"),
                this.add_gold_box = this.owner.getChildByName("add_gold"),
                this.level_progress_box = this.owner.getChildByName("progress"),
                this.treasure_box = this.owner.getChildByName("treasure_box"),
                this.gold_speed = this.win_up_speed.getChildByName("gold_speed"),
                this.curr_level = this.level_box.getChildByName("curr_level"),
                this.get_gold = this.add_gold_box.getChildByName("get_gold"),
                this.level_progress = this.level_progress_box.getChildByName("level_progress"),
                this.win_btn_box = this.owner.getChildByName("win_btn_box"),
                this.back_main_win = this.win_btn_box.getChildByName("back_main"),
                this.back_main_lose = this.lose_btn_box.getChildByName("back_main"),
                this.back_icon = this.back_main_win.getChildByName("back_icon"),
                this.level_nevxt = this.win_btn_box.getChildByName("up_level"),
                this.help = this.lose_btn_box.getChildByName("up_level"),
                this.level_next_boss = this.win_btn_box.getChildByName("up_boss_level"),
                this.win_shared = this.win_btn_box.getChildByName("shared"),
                this.level_scene = this.owner.getChildByName("level_scene"),
                this.result_icon = this.owner.getChildByName("result_icon"),
                this.tip = this.owner.getChildByName("power_tip"),
                this.infos.push(this.level_box, this.level_progress_box, this.add_gold_box, this.win_up_speed);
            this.help.visible = 0
        }
        updateResultInfo() {
            let e = X.Instance.getLevelScene();
            parseInt(e.split("_")[1]);
            if (X.Instance.gameResult) {
                this.level_scene.loadImage("levelup/level_up_pic_" + X.Instance.scene_bg_id + "_1.png"),
                    this.result_icon.loadImage("levelup/medal_gold.png"),
                    this.curr_level.text = X.Instance.level - 1 + "",
                    this.lose_btn_box.visible = !1,
                    this.win_up_speed.visible = !0,
                    this.win_btn_box.visible = !0,
                    this.level_progress.text = "100%";
                let e = X.Instance.getLevelEarnings();
                if (this.gold_speed.text = i.changeGoldUnit(e) + "/秒", this.player.filters = [], X.Instance.level - 1 < 4)
                    this.level_nevxt.visible = !1, this.back_main_win.width = 250, this.back_main_win.pivotX = 125, this.back_main_win.x = 375, this.level_next_boss.visible = !1, this.win_shared.visible = !1, this.back_icon.x = 125;
                else {
                    this.back_main_win.width = 105,
                        this.back_main_win.pivotX = 52.5,
                        this.back_main_win.x = 139;
                    let e = X.Instance.judgeBossLevel();
                    this.level_nevxt.visible = !e,
                        this.level_next_boss.visible = e,
                        this.win_shared.visible = !1,
                        this.back_icon.x = 53
                }
                _.Dispatch(g.LevelSuccess, X.Instance.level - 1)
            } else {
                this.level_scene.loadImage("levelup/level_up_pic_" + X.Instance.scene_bg_id + "_2.png"),
                    this.result_icon.loadImage("levelup/medal_silver.png"),
                    this.level_progress.text = X.Instance.gameProgress + "%",
                    this.curr_level.text = X.Instance.level + "",
                    this.lose_btn_box.visible = !0,
                    this.win_btn_box.visible = !1,
                    this.win_up_speed.visible = !1;
                let e = [.3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, 0, 0, 0, 1, 0],
                    t = new Laya.ColorFilter(e);
                this.player.filters = [t],
                    _.Dispatch(g.LevelFailed, X.Instance.level)
            }
            Laya.timer.once(500, this, () => {
                Laya.timer.loop(this.interval, this, this.showInfos)
            })
        }
        showInfos() {
            let e = this.infos[this.infos_index];
            e ? Laya.Tween.to(e, {
                x: 85
            }, 200) : (Laya.timer.clear(this, this.showInfos), this.createDrops()),
                this.infos_index++
        }
        addButtonEffListener() {
            ee.buttonEff(this.back_main_win, this, this.backMainView),
                ee.buttonEff(this.back_main_lose, this, this.backMainView),
                ee.buttonEff(this.level_nevxt, this, this.nextLevel),
                ee.buttonEff(this.level_next_boss, this, this.nextLevel)
        }
        backMainView() {
            _.Dispatch(g.ButtonCounnt, c.GameButtonName.RESULT_BACK_BTN),
                T.loadSceneIndex = 0,
                o.pauseBgMusic(),
                this.closeSelf(),
                _.Dispatch(g.LoadMainUI)
        }
        nextLevel() {
            if (_.Dispatch(g.ButtonCounnt, c.GameButtonName.RESULT_NEXT_BTN), _.Dispatch(g.HPFullState), B.Instance.power_info[1] <= 0)
                return _.Dispatch(g.AppendBox, "prefabs/Popp/SharePopp.json", 1), this.tip.visible = !0, void Laya.Tween.to(this.tip, {
                    y: 200
                }, 1e3, null, Laya.Handler.create(this, () => {
                    this.tip.y = 1090,
                        this.tip.visible = !1
                })); {
                B.Instance.power_info[1]--;
                let e = B.Instance.power_info[0] - Date.now() / 1e3;
                B.Instance.savePowerValue(e)
            }
            this.closeSelf(),
                _.Dispatch(g.ShowBannerAD, 1),
                Le.Instance.nextLevelGame()
        }
        closeSelf() {
            X.Instance.super_add_gold = 0;
            for (let e = 0; e < this.weapons.length; e++) {
                const s = this.weapons[e];
                t.cycleObject("drop_icon", s),
                    s.removeSelf()
            }
            B.Instance.saveKnaspceArray(),
                super.closeSelf()
        }
        removeListener() {
            _.RemoveListener(g.OverResult, this, this.sharedResult)
        }
        sharedResult() {}
        onDisable() {
            super.onDisable(),
                this.player.removeSelf(),
                this.player.destroy(!0),
                this.player = null
        }
    }
    var it = c.ShareConfig,
        at = c.GameButtonName;
    class nt extends Qe {
        constructor() {
            super(...arguments),
                this.sharedType = 0,
                this.sharedTypeStrs = ["Gold", "Refection"],
                this.event_type = 0,
                this.click_flag = !1,
                this.btn_type = ""
        }
        onAwake() {
            super.onAwake(),
                this.addButtonEffListener()
        }
        onEnable() {
            super.onEnable(),
                this.initOver = !0,
                this.click_flag = !1
        }
        initView() {
            if (super.initView(), this.initOver) {
                this.sharedType = this.params[1],
                    0 == this.sharedType ? (this.event_type = g.GoldResult, this.shared_index = it.GOLD, this.showGoldUI(), this.share_btn = at.SHARE_GOLD_BTN, this.close_btn = at.SHARE_GOLD_CLOSE_BTN) : (this.event_type = g.RefectionResult, this.shared_index = it.REFECTION, this.share_btn = at.POWER_GET_BTN, this.close_btn = at.POWER_CLOSE_BTN, this.showPowerUI());
                B.Instance.getButtonType(this.shared_index);
                this.btn_type = s.BUTTON_TYPE_VIDEO,
                    this.btnTypeIcon.loadImage("offline_speedup/video.png")
            }
        }
        showPowerUI() {
            this.sharedTitle.text = "获取体力",
                this.residue = B.Instance.getSharedNum(it.REFECTION),
                this.sharedCountTip.text = "剩余的奖励次数:" + this.residue,
                this.sharedIcon.loadImage("main/share_icon_1.png"),
                this.award.text = "+5"
        }
        showGoldUI() {
            this.sharedTitle.text = "获取金币",
                this.residue = B.Instance.getSharedNum(it.GOLD),
                this.sharedCountTip.text = "剩余的奖励次数:" + this.residue,
                this.sharedIcon.loadImage("main/share_icon_0.png"),
                this.gold_num = X.Instance.addShareGoldAward(),
                this.award.text = "+" + this.gold_num
        }
        addListener() {
            this.closeBtn.on(Laya.Event.CLICK, this, this.closeSelf),
                _.AddListener(g.GoldResult, this, this.sharedResult),
                _.AddListener(g.RefectionResult, this, this.sharedResult)
        }
        removeListener() {
            this.closeBtn.off(Laya.Event.CLICK, this, this.closeSelf),
                _.RemoveListener(g.GoldResult, this, this.sharedResult),
                _.RemoveListener(g.RefectionResult, this, this.sharedResult)
        }
        closeSelf() {
            super.closeSelf(),
                _.Dispatch(g.ButtonCounnt, this.close_btn)
        }
        addButtonEffListener() {
            ee.buttonEff(this.sharedBtn, this, this.clickSharedBtn)
        }
        getChildren() {
            this.closeBtn = this.owner.getChildByName("close_btn"),
                this.sharedBtn = this.owner.getChildByName("share_btn"),
                this.sharedTitle = this.owner.getChildByName("share_title"),
                this.award = this.owner.getChildByName("award_num"),
                this.sharedCountTip = this.owner.getChildByName("share_count_tip"),
                this.sharedIcon = this.owner.getChildByName("share_icon"),
                this.btnTypeIcon = this.owner.getChildByName("btn_type")
        }
        clickSharedBtn() {
            this.click_flag || (this.click_flag = !0, _.Dispatch(g.ButtonCounnt, this.share_btn), o.playSceneSound("button"), console.log("视频点1111"), playVideo(res => {
                if (res) {
                    this.sharedResult([!0])
                }
            }))
        }
        sharedResult(e) {
            console.log("视频成功");
            let t = B.Instance;
            e[0] && t.judgeDaySharedCount(this.shared_index) ? (0 == this.sharedType ? (X.Instance.gold += this.gold_num, _.Dispatch(g.ShowGoldEff, this.gold_num)) : _.Dispatch(g.UpdateSharePower), t.shared_video_btn_count[this.shared_index]++, t.shared_video_day_count[this.shared_index]++, t.saveShardInfo(), super.closeSelf()) : e[0] && _.Dispatch(g.AppendTextTip, "当前功能奖励次数上限", 1500)
        }
    }
    var ot = c.ShareConfig;
    class ht extends Qe {
        constructor() {
            super(...arguments),
                this.btn_type = ""
        }
        onAwake() {
            super.onAwake(),
                this.addButtonEffListener()
        }
        onEnable() {
            super.onEnable(),
                _.Dispatch(g.HideSafeBox),
                se.safeBoxPoppExist = !0;
            B.Instance.getButtonType(ot.SAFEBOX);
            this.btn_type = s.BUTTON_TYPE_VIDEO,
                this.btnTypeIcon.loadImage("offline_speedup/video.png"),
                this.shop_btn.skin = "common/button_orange.png"
        }
        getChildren() {
            this.shop_btn = this.owner.getChildByName("shop_btn"),
                this.close_btn = this.owner.getChildByName("close_btn"),
                this.btnTypeIcon = this.owner.getChildByName("btn_type")
        }
        addListener() {
            this.close_btn.on(Laya.Event.CLICK, this, this.closeSelf),
                _.AddListener(g.SafeResult, this, this.shareResult)
        }
        removeListener() {
            this.close_btn.off(Laya.Event.CLICK, this, this.closeSelf),
                _.RemoveListener(g.SafeResult, this, this.shareResult)
        }
        addButtonEffListener() {
            ee.buttonEff(this.shop_btn, this, this.shopTreasureSuccess)
        }
        shopTreasureSuccess() {
            _.Dispatch(g.ButtonCounnt, c.GameButtonName.TREASURE_GET_BTN),
                console.log("视频点"),
                ye.showview(function () {
                    _.Dispatch(g.SafeResult, [!0])
                })
        }
        shareResult(e) {
            let t = B.Instance;
            e[0] && t.judgeDaySharedCount(ot.SAFEBOX) ? (We.Instance.getTreasureData(0), super.closeSelf(), _.Dispatch(g.OpenTreasuere), t.shared_video_btn_count[ot.SAFEBOX]++, t.shared_video_day_count[ot.SAFEBOX]++, t.saveShardInfo()) : e[0] && _.Dispatch(g.AppendTextTip, "当前功能奖励次数上限", 1500)
        }
        closeSelf() {
            _.Dispatch(g.SafeBoxGameResume),
                se.safeBoxPoppExist = !1,
                _.Dispatch(g.ReSafeBoxCreate),
                super.closeSelf(),
                _.Dispatch(g.ButtonCounnt, c.GameButtonName.TREASURE_CLOSE_BTN)
        }
    }
    var rt = c.ShareConfig;
    class lt extends Qe {
        constructor() {
            super(...arguments),
                this.btn_type = "",
                this.point = [350, 650]
        }
        onAwake() {
            super.onAwake(),
                this.addConfirmButtonLiseter()
        }
        onEnable() {
            super.onEnable(),
                this.sign_data = B.Instance.getSignInfo(),
                this.initUI()
        }
        getChildren() {
            this.confirm_btn = this.owner.getChildByName("confirm_btn"),
                this.super_confirm_btn = this.owner.getChildByName("super_confirm_btn"),
                this.close_btn = this.owner.getChildByName("close_btn"),
                this.btnTip = this.super_confirm_btn.getChildByName("btnTip")
        }
        addConfirmButtonLiseter() {
            ee.buttonEff(this.super_confirm_btn, this, this.clickComfirmAwardBtn),
                ee.buttonEff(this.confirm_btn, this, this.clickCommonAwardBtn)
        }
        addListener() {
            this.close_btn.on(Laya.Event.CLICK, this, this.closeSelf),
                _.AddListener(g.SignResult, this, this.shareResult)
        }
        removeListener() {
            this.close_btn.off(Laya.Event.CLICK, this, this.closeSelf),
                _.RemoveListener(g.SignResult, this, this.shareResult)
        }
        clickCommonAwardBtn() {
            _.Dispatch(g.ButtonCounnt, c.GameButtonName.SIGN_COMMON_BTN),
            1 == this.curr_award[0] && (X.Instance.gold += this.curr_award[1]),
                this.sign_data[1] ? this.getAwardSuccess(1) : this.closeGetAwardSelf()
        }
        clickComfirmAwardBtn() {
            this.sign_data[1] ? (_.Dispatch(g.ButtonCounnt, c.GameButtonName.SIGN_SUPER_BTN), console.log("视频点"), ye.showview(function () {
                _.Dispatch(g.SignResult, [!0])
            })) : super.closeSelf()
        }
        getAwardSuccess(e) {
            this.super_confirm_btn.visible = !1,
                this.confirm_btn.label = "明日再来",
                this.confirm_btn.skin = "common/button_yellow.png",
                this.days[this.sign_data[0]].skin = "daily/daily_3.png",
                this.sign_data[1] = !1,
                B.Instance.saveSignInfo(),
                _.Dispatch(g.UpdateGoldMain),
                _.Dispatch(g.ShowGoldEff, this.curr_award[1], e)
        }
        initUI() {
            this.days = [],
            this.sign_data[1] || 0 === this.sign_data[0] || this.sign_data[0]--,
                this.curr_award = [];
            let e = this.sign_data[0],
                t = C.Instance.getLoginConfig(e),
                a = 0;
            a = 1 === t[0] ? t[1] * X.Instance.level : t[1],
                this.curr_award.push(t[0], a);
            B.Instance.getButtonType(rt.QIANDAO);
            this.btn_type = s.BUTTON_TYPE_VIDEO;
            for (let e = 0; e < 6; e++) {
                let t = this.owner.getChildByName("day_" + (e + 1));
                this.days.push(t);
                let s = t.getChildByName("gold_award");
                e == this.sign_data[0] ? (s.text = "+" + i.changeGoldUnit(a), this.sign_data[1] ? t.skin = "daily/daily_2.png" : (t.skin = "daily/daily_3.png", this.confirm_btn.label = "明日再来", s.color = "#9779E8", this.confirm_btn.skin = "common/button_yellow.png", this.super_confirm_btn.visible = !1)) : (this.super_confirm_btn.visible = !0, s.text = "+???", s.color = "#9779E8", e < this.sign_data[0] && (t.skin = "daily/daily_3.png"))
            }
        }
        closeGetAwardSelf() {
            super.closeSelf()
        }
        closeSelf() {
            super.closeSelf(),
                o.playSceneSound("button")
        }
        shareResult(e) {
            let t = B.Instance;
            e[0] && t.judgeDaySharedCount(rt.QIANDAO) ? (this.curr_award[1] = 2 * this.curr_award[1], 1 == this.curr_award[0] && (X.Instance.gold += this.curr_award[1]), this.getAwardSuccess(2), t.shared_video_btn_count[rt.QIANDAO]++, t.shared_video_day_count[rt.QIANDAO]++, t.saveShardInfo(), super.closeSelf()) : e[0] && _.Dispatch(g.AppendTextTip, "当前功能奖励次数上限", 1500)
        }
        onDisable() {
            super.onDisable(),
                _.Dispatch(g.ShowBannerAD, 0)
        }
    }
    class pt extends Laya.Script {
        constructor() {
            super(...arguments),
                this.interval = 500,
                this.preY = 0,
                this.preX = 0
        }
        onAwake() {
            this.scorllText = this.owner,
                this.scorllText.overflow = Laya.Text.SCROLL,
                this.scorllText.height = this.scorllText.fontSize,
                this.texts = [],
            this.scorll_Y || (this.scorll_Y = this.scorllText.height),
            this.scorll_X || (this.scorll_X = 0)
        }
        initText(e) {
            this.scorllText.text = e
        }
        addText(e, t = 500) {
            this.interval = t,
                this.texts.push(e),
            this.texts.length > 1 || this.showScrollTexts()
        }
        showScrollTexts() {
            this.scorllText.text += "\n" + this.texts[0],
                this.preY += this.scorll_Y,
                this.preX += this.scorll_X,
                Laya.Tween.to(this.scorllText, {
                    scrollX: this.preX,
                    scrollY: this.preY
                }, this.interval, null, Laya.Handler.create(this, () => {
                    let e = this.texts.shift();
                    this.texts.length > 0 ? this.showScrollTexts() : (this.scorllText.scrollX = 0, this.scorllText.scrollY = 0, this.preX = 0, this.preY = 0, this.scorllText.text = e)
                }))
        }
        complete() {}
        onDisable() {
            this.texts.pop() && (this.scorllText.text = this.texts.pop()),
                this.preX = 0,
                this.preY = 0,
                this.scorllText.scrollX = 0,
                this.scorllText.scrollY = 0
        }
    }
    var dt = c.ShareConfig;
    class ct extends Qe {
        constructor() {
            super(...arguments),
                this.init_over = !1,
                this.buttons_flag = [!1, !1, !1, !1, !1],
                this.btn_type = "",
                this.firstShow = !1
        }
        onAwake() {
            super.onAwake(),
                this.lock_boxs = [],
                this.addButtonEffListener()
        }
        onEnable() {
            super.onEnable(),
                this.firstShow = !0;
            X.Instance.level;
            this.skill_data = C.Instance.getSkillConfig(),
                this.updateAllSkillDataInfo(),
                this.firstShow = !1,
                this.init_over = !0;
            B.Instance.getButtonType(dt.SKILL_UP);
            this.btn_type = s.BUTTON_TYPE_VIDEO
        }
        updateAllSkillDataInfo() {
            this.gold.text = i.changeGoldUnit(X.Instance.gold);
            for (let e = 0; e < this.skill_data.length; e++)
                this.changeSkillData(e)
        }
        addListener() {
            this.close_btn.on(Laya.Event.CLICK, this, this.closeSelf),
                _.AddListener(g.SkillUpResult, this, this.upSkillSuccess),
                _.AddListener(g.UpdateSkillButtn, this, this.updateAllSkillDataInfo)
        }
        addButtonEffListener() {
            for (let e = 0; e < this.level_up.length; e++) {
                const t = this.level_up[e];
                ee.buttonEff(t, this, this.clickUpLevel, !1, e)
            }
            for (let e = 0; e < this.up_btn.length; e++) {
                const t = this.up_btn[e];
                ee.buttonEff(t, this, this.clickSharedUpLevel, !1, e)
            }
        }
        removeListener() {
            this.close_btn.off(Laya.Event.CLICK, this, this.closeSelf),
                _.RemoveListener(g.SkillUpResult, this, this.upSkillSuccess),
                _.RemoveListener(g.UpdateSkillButtn, this, this.updateAllSkillDataInfo)
        }
        closeSelf() {
            super.closeSelf(),
                o.playSceneSound("button")
        }
        clickUpLevel(e) {
            if (this.curr_index = e, !this.buttons_flag[e])
                return;
            let t = X.Instance.getSkillInfo(e, !0);
            X.Instance.skillsData[e]++,
                X.Instance.gold -= t[1],
                t = X.Instance.getSkillInfo(e, !0);
            let s = X.Instance.skillsData[this.curr_index];
            this.levelTexts[e].addText(s + "", 500),
                this.atkTexts[e].addText(t[0] + "", 500),
                this.gold.text = i.changeGoldUnit(X.Instance.gold),
                this.updateAllSkillDataInfo()
        }
        clickSharedUpLevel(e) {
            if (console.log("点击"), this.curr_index = e, !this.buttons_flag[e])
                return this.buttons_flag[e] = !0, void _.Dispatch(g.AppendBox, "prefabs/Popp/SkillVideoPopp.json")
        }
        upSkillSuccess(e) {
            console.log("升级");
            let t = B.Instance;
            if (e[0] && t.judgeDaySharedCount(dt.SKILL_UP)) {
                X.Instance.skillsData[this.curr_index]++;
                let e = X.Instance.getSkillInfo(this.curr_index, !0),
                    s = X.Instance.skillsData[this.curr_index];
                this.levelTexts[this.curr_index].addText(s + "", 1500),
                    this.atkTexts[this.curr_index].addText(e[0] + "", 1500),
                    this.gold.text = i.changeGoldUnit(X.Instance.gold),
                    this.updateAllSkillDataInfo(),
                    t.shared_video_btn_count[dt.SKILL_UP]++,
                    t.shared_video_day_count[dt.SKILL_UP]++,
                    t.saveShardInfo()
            } else
                e[0] && _.Dispatch(g.AppendTextTip, "当前功能奖励次数上限", 1500), this.updateAllSkillDataInfo()
        }
        changeSkillData(e) {
            let t = X.Instance.level,
                s = X.Instance.skillsData[e],
                a = this.skill_data[e][0];
            if (0 == s && (a[2] <= t && (X.Instance.skillsData[e] = 1), s = 1), (a = this.skill_data[e][s - 1])[2] <= t) {
                this.skill_boxs[e].visible = !0,
                this.lock_boxs[e] && this.lock_boxs[e].removeSelf(),
                    this.level_up[e].skin = "common/button_green.png";
                let t = X.Instance.getSkillInfo(e, !0);
                this.firstShow && (this.skill_level[e].text = s + "", this.skill_atk[e].text = a[4] + ""),
                    this.skill_num[e].text = a[3],
                    this.gold_num[e].text = i.changeGoldUnit(t[1]),
                    t[1] <= X.Instance.gold ? (this.buttons_flag[e] = !0, this.up_btn[e].visible = !1, this.level_up[e].visible = !0, this.level_up[e].skin = "common/button_green.png", this.up_tip[e].color = "#1C8614", this.gold_num[e].color = "#FBFD47") : (this.buttons_flag[e] = !1, this.level_up[e].visible = !1, this.up_btn[e].visible = !0, this.btnTypeIcons[e].loadImage("offline_speedup/" + this.btn_type + ".png"))
            } else {
                if (this.init_over)
                    return;
                this.skill_boxs[e].visible = !1;
                let t = Laya.loader.getRes("prefabs/Skill_item_lock.json"),
                    s = new Laya.Prefab;
                s.json = t;
                let i = s.create();
                this.owner.addChild(i),
                    i.pos(this.skill_boxs[e].x, this.skill_boxs[e].y),
                    i.getChildByName("lock_tip").text = "第" + a[2] + "关解锁",
                    this.lock_boxs[e] = i
            }
        }
        getChildren() {
            this.skill_level = [],
                this.levelTexts = [],
                this.atkTexts = [],
                this.skill_atk = [],
                this.skill_num = [],
                this.level_up = [],
                this.up_btn = [],
                this.btnTypeIcons = [],
                this.gold_num = [],
                this.up_tip = [],
                this.skill_boxs = [],
                this.gold = this.owner.getChildByName("gold"),
                this.close_btn = this.owner.getChildByName("close_self");
            let e = this.owner.getChildByName("fly_cutter");
            this.skill_boxs.push(e),
                this.getAllSkillChild(e),
                e = this.owner.getChildByName("dog"),
                this.skill_boxs.push(e),
                this.getAllSkillChild(e),
                e = this.owner.getChildByName("bomb"),
                this.skill_boxs.push(e),
                this.getAllSkillChild(e),
                e = this.owner.getChildByName("rocket"),
                this.skill_boxs.push(e),
                this.getAllSkillChild(e),
                e = this.owner.getChildByName("medical"),
                this.skill_boxs.push(e),
                this.getAllSkillChild(e)
        }
        getAllSkillChild(e) {
            let t = e.getChildByName("level"),
                s = e.getChildByName("num"),
                i = e.getChildByName("atk");
            this.skill_level.push(t);
            let a = t.getComponent(pt);
            this.levelTexts.push(a);
            let n = i.getComponent(pt);
            this.atkTexts.push(n),
                this.skill_num.push(s),
                this.skill_atk.push(i);
            let o = e.getChildByName("level_up"),
                h = e.getChildByName("up_btn");
            this.level_up.push(o),
                this.up_btn.push(h);
            let r = h.getChildByName("btn_type");
            this.btnTypeIcons.push(r);
            let l = o.getChildByName("up_tip"),
                p = o.getChildByName("gold_num");
            this.up_tip.push(l),
                this.gold_num.push(p)
        }
        initSkillData() {}
        onDisable() {
            super.onDisable(),
                B.Instance.savePropArray(),
                B.Instance.saveGameData(),
                _.Dispatch(g.UpdateMainUITip),
                _.Dispatch(g.UpdateGoldMain),
                _.Dispatch(g.ShowBannerAD, 0)
        }
    }
    class ut extends Qe {
        onAwake() {
            super.onAwake(),
                this.addButtonEffListener()
        }
        onEnable() {
            super.onEnable()
        }
        getChildren() {
            this.selfBtn = this.owner.getChildByName("self_btn"),
                this.videoBtn = this.owner.getChildByName("up_btn")
        }
        addListener() {
            this.selfBtn.on(Laya.Event.CLICK, this, this.closeSelf),
                _.AddListener(g.SkillUpResult, this, this.upSkillResult)
        }
        removeListener() {
            this.selfBtn.off(Laya.Event.CLICK, this, this.closeSelf),
                _.RemoveListener(g.SkillUpResult, this, this.upSkillResult)
        }
        addButtonEffListener() {
            ee.buttonEff(this.videoBtn, this, this.playVideo)
        }
        playVideo() {
            console.log("视频点"),
                ye.showview(function () {
                    _.Dispatch(g.SkillUpResult, [!0])
                })
        }
        upSkillResult(e) {
            e[0] && this.closeSelf()
        }
        closeSelf() {
            super.closeSelf(),
                _.Dispatch(g.UpdateSkillButtn)
        }
    }
    class mt extends Qe {
        onAwake() {
            super.onAwake(),
                this.soundFlag = !0,
                this.noSound.visible = !1,
                this.closeBtn.on(Laya.Event.CLICK, this, () => {
                    o.playSceneSound("button"),
                        this.closeSelf()
                })
        }
        onEnable() {
            super.onEnable(),
                this.soundFlag = o.stopGameSound
        }
        getChildren() {
            this.noSound = this.owner.getChildByName("no_sound"),
                this.sound = this.owner.getChildByName("sound_controller"),
                this.closeBtn = this.owner.getChildByName("closePop")
        }
        addListener() {
            this.sound.on(Laya.Event.CLICK, this, this.changeSoundController)
        }
        removeListener() {
            this.sound.off(Laya.Event.CLICK, this, this.changeSoundController)
        }
        changeSoundController() {
            o.playSceneSound("button"),
                this.soundFlag = !this.soundFlag,
                this.soundFlag ? o.Instance.stopGameMusic() : o.Instance.resumeGameMusic(),
                this.noSound.visible = this.soundFlag
        }
    }
    var gt = c.ShareConfig;
    class _t extends Qe {
        constructor() {
            super(...arguments),
                this.unitStr = ["%", "小时", "倍率", "", ""],
                this.buttons_flag = [!1, !1, !1, !1, !1],
                this.curr_index = 0,
                this.initDataFlag = !1
        }
        onAwake() {
            super.onAwake(),
                this.addButtonEffListener(),
                this.talentCurrTexts = [],
                this.talentUpTexts = [],
                this.talentPointText = this.talent_point.getComponent(pt)
        }
        onEnable() {
            super.onEnable(),
                this.initDataFlag = !1,
                this.updateTalentUI(),
                this.talent_point.text = B.Instance.talent_point + ""
        }
        getChildren() {
            this.close_btn = this.owner.getChildByName("close_btn"),
                this.talents = [];
            let e = this.owner.getChildByName("level_award"),
                t = this.owner.getChildByName("off_line_timer"),
                s = this.owner.getChildByName("add_speed_timer"),
                i = this.owner.getChildByName("speed_count"),
                a = this.owner.getChildByName("power_limit"),
                n = this.owner.getChildByName("talent_count");
            this.talent_point = n.getChildByName("perk_count"),
                this.talents.push(e, t, s, i, a)
        }
        updateTalentUI() {
            let e = B.Instance.talents,
                t = C.Instance.getTalentConfig(),
                s = !1;
            this.talentUpTexts.length > 0 && (s = !0);
            let i = 0,
                a = 0;
            for (let n = 0; n < this.talents.length; n++) {
                const o = this.talents[n];
                this.initDataFlag || (a = 1, 0 == n && (a = 100), i = Math.floor(t[n][e[n]].Talent_Value * a));
                let h = o.getChildByName("curr_att"),
                    r = o.getChildByName("up_att"),
                    l = o.getChildByName("up_btn"),
                    p = o.getChildByName("direction");
                if (!s) {
                    let e = h.getComponent(pt),
                        t = r.getComponent(pt);
                    this.talentUpTexts.push(t),
                        this.talentCurrTexts.push(e)
                }
                if (this.initDataFlag || (h.text = i + this.unitStr[n]), e[n] + 1 > 5)
                    p.loadImage("perk/perk_maxlevel_mark.png"), o.skin = "perk/window_list_maxperks.png", l.skin = "perk/maxperks_mark.png", l.width = 96, l.height = 124, l.label = "", r.text = "已满级", l.removeChildren(), l.pos(510, 60), l.mouseEnabled = !1, this.buttons_flag[n] = !1;
                else {
                    if (!this.initDataFlag) {
                        let s = Math.floor(t[n][e[n] + 1].Talent_Value * a);
                        r.text = s + this.unitStr[n]
                    }
                    B.Instance.talent_point > 0 ? (this.buttons_flag[n] = !0, l.skin = "common/button_green.png", l.labelColors = "#1B8617") : (this.buttons_flag[n] = !1, l.skin = "common/button_grey.png", l.labelColors = "#9B9B9B")
                }
            }
            this.initDataFlag = !0
        }
        upTalentData(e) {
            this.curr_index = e,
            this.buttons_flag[e] && (B.Instance.talents[e]++, B.Instance.talent_point--, this.talentPointText.addText(B.Instance.talent_point + ""), 4 == e && _.Dispatch(g.UpdatePowerLimit), this.updateTalentUI(), this.updateInfo())
        }
        updateInfo() {
            let e = B.Instance.talents,
                t = 1;
            0 == this.curr_index && (t = 100);
            let s = C.Instance.getTalentConfig(),
                i = Math.floor(s[this.curr_index][e[this.curr_index]].Talent_Value * t);
            if (this.talentCurrTexts[this.curr_index].addText(i + this.unitStr[this.curr_index] + ""), s[this.curr_index][e[this.curr_index] + 1]) {
                let i = Math.floor(s[this.curr_index][e[this.curr_index] + 1].Talent_Value * t);
                this.talentUpTexts[this.curr_index].addText(i + this.unitStr[this.curr_index] + "")
            }
        }
        initTalentUI() {}
        onDisable() {
            super.onDisable(),
                _.Dispatch(g.UpdateAddGoldSecond),
                _.Dispatch(g.UpdateGoldAward),
                _.Dispatch(g.UpdateMainUITip),
                B.Instance.saveTalentPointValue(),
                B.Instance.saveTalentInfo(),
                _.Dispatch(g.ShowBannerAD, 0)
        }
        addListener() {
            this.close_btn.on(Laya.Event.CLICK, this, this.closeSelf)
        }
        shareResult(e) {
            let t = B.Instance;
            e[0] && t.judgeDaySharedCount(gt.GIFT) ? (B.Instance.talents[this.curr_index]++, 4 == this.curr_index && _.Dispatch(g.UpdatePowerLimit), this.updateTalentUI(), t.shared_video_btn_count[gt.GIFT]++, t.shared_video_day_count[gt.GIFT]++, t.saveShardInfo()) : e[0] && _.Dispatch(g.AppendTextTip, "当前功能奖励次数上限", 1500)
        }
        addButtonEffListener() {
            for (let e = 0; e < this.talents.length; e++) {
                let t = this.talents[e].getChildByName("up_btn");
                ee.buttonEff(t, this, this.upTalentData, !1, e)
            }
        }
        removeListener() {
            this.close_btn.off(Laya.Event.CLICK, this, this.closeSelf),
                _.RemoveListener(g.GiftResult, this, this.shareResult)
        }
        closeSelf() {
            super.closeSelf(),
                _.Dispatch(g.UpdateTalentGoldSpeed),
                o.playSceneSound("button")
        }
    }
    var ft,
        yt = c.ShareConfig;
    class St extends Qe {
        constructor() {
            super(...arguments),
                this.weapon_type = 0,
                this.weapon_level = [0, 0],
                this.level_up_num = 0,
                this.weapon_type_strs = ["gun", "cloth", "helmet"]
        }
        onAwake() {
            super.onAwake(),
                this.level_up_num = X.Instance.getGlobalConfigInfo().straightup_level,
                this.addButtonEffListener()
        }
        getChildren() {
            let e = [this.owner.getChildByName("curr_gun"), this.owner.getChildByName("up_gun")];
            this.currWeaponBg = [],
                this.currLevelBg = [],
                this.currWeaponIcon = [],
                this.currLevel = [],
                this.curr_weapon_atk = [],
                this.curr_weapon_atk_name = [],
                this.curr_weapon_atk_speed = [],
                this.curr_weapon_atk_speed_name = [],
                this.curr_weapon_name = [];
            for (let t = 0; t < e.length; t++) {
                let s = e[t];
                this.currWeaponBg[t] = s.getChildByName("gun_bg"),
                    this.currLevelBg[t] = s.getChildByName("level_bg"),
                    this.currWeaponIcon[t] = s.getChildByName("gun_icon"),
                    this.currLevel[t] = s.getChildByName("level"),
                    this.curr_weapon_atk[t] = s.getChildByName("weapon_atk"),
                    this.curr_weapon_atk_name[t] = s.getChildByName("weapon_atk_name"),
                    this.curr_weapon_atk_speed[t] = s.getChildByName("weapon_atk_speed"),
                    this.curr_weapon_atk_speed_name[t] = s.getChildByName("weapon_atk_speed_name"),
                    this.curr_weapon_name[t] = s.getChildByName("weapon_name")
            }
            this.closeBtn = this.owner.getChildByName("close_btn"),
                this.upBtn = this.owner.getChildByName("up_btn")
        }
        addButtonEffListener() {
            ee.buttonEff(this.upBtn, this, this.onSuperAward)
        }
        addListener() {
            _.AddListener(g.WeaponLevelUpResult, this, this.levelUpResult),
                this.closeBtn.on(Laya.Event.CLICK, this, this.closeSelf)
        }
        removeListener() {
            _.RemoveListener(g.WeaponLevelUpResult, this, this.levelUpResult),
                this.closeBtn.off(Laya.Event.CLICK, this, this.closeSelf)
        }
        closeSelf() {
            o.playSceneSound("button"),
                super.closeSelf()
        }
        onSuperAward() {
            _.Dispatch(g.ButtonClicked, "StraightUp", s.BUTTON_TYPE_VIDEO, 2)
        }
        onEnable() {
            super.onEnable(),
                this.initOver = !0,
                this.closeBtn.y = s.BG_HEIGHT - this.closeBtn.height,
                Laya.timer.once(1e3, this, () => {
                    this.closeBtn.y -= s.BANNER_HEIGHT
                })
        }
        initView() {
            this.initOver && (this.weapon_type = this.params[1], this.weapon_level = [this.params[2], this.params[2] + this.level_up_num], this.changeWeaponInfo(0), this.changeWeaponInfo(1))
        }
        changeWeaponInfo(e) {
            let t = 0;
            switch (this.weapon_type) {
                case 1:
                    t = 2;
                    break;
                case 2:
                    t = 1
            }
            let s = C.Instance.getItemConfig()[t][this.weapon_level[e] - 1],
                i = s.Item_BGColor;
            switch (this.currLevelBg[e].skin = "item/item_level_mark_" + i + ".png", this.currWeaponIcon[e].skin = "icon/" + this.weapon_type_strs[t] + "_" + this.weapon_level[e] + ".png", this.currWeaponBg[e].skin = "item/item_level_" + i + ".png", this.currLevel[e].text = this.weapon_level[e] + "", this.curr_weapon_name[e].text = s.Item_Name, this.weapon_type) {
                case 0:
                    this.curr_weapon_atk_name[e].visible = !0,
                        this.curr_weapon_atk[e].visible = !0,
                        this.curr_weapon_atk_speed_name[e].text = "攻速",
                        this.curr_weapon_atk_name[e].text = "秒伤";
                    let a = s.Item_Parameter;
                    this.curr_weapon_atk[e].text = s.Item_attri;
                    let n = a[1] / a[3] * 1e3;
                    this.curr_weapon_atk_speed[e].text = n.toFixed(1) + "/秒";
                    break;
                case 2:
                    this.curr_weapon_atk_name[e].visible = !1,
                        this.curr_weapon_atk[e].visible = !1,
                        this.curr_weapon_atk_speed_name[e].text = "护甲",
                        this.curr_weapon_atk_speed[e].text = s.Item_attri;
                    break;
                case 1:
                    this.curr_weapon_atk_name[e].visible = !1,
                        this.curr_weapon_atk[e].visible = !1,
                        this.curr_weapon_atk_speed_name[e].text = "生命",
                        this.curr_weapon_atk_speed[e].text = s.Item_attri
            }
        }
        levelUpResult(e) {
            let t = B.Instance;
            e[0] && t.judgeDaySharedCount(yt.STRAIGHT_UP) ? (this.shopWeapon(1), t.shared_video_btn_count[yt.STRAIGHT_UP]++, t.shared_video_day_count[yt.STRAIGHT_UP]++, t.saveShardInfo(), super.closeSelf()) : e[0] && _.Dispatch(g.AppendTextTip, "当前功能奖励次数上限", 1500)
        }
        shopWeapon(e) {
            for (let t = 0; t < B.Instance.knaspaceArray[this.weapon_type].length; t++) {
                if (0 == B.Instance.knaspaceArray[this.weapon_type][t]) {
                    B.Instance.knaspaceArray[this.weapon_type][t] = this.weapon_level[e];
                    break
                }
            }
            _.Dispatch(g.RefreshKnaspaceUI)
        }
    }
    class bt extends Qe {
        constructor() {
            super(...arguments),
                this.weapon_type_strs = ["gun", "cloth", "helmet"]
        }
        onAwake() {
            super.onAwake(),
                this.addButtonEffListener(),
                this.initOver = !0
        }
        getChildren() {
            this.color_boxs = [],
                this.level_bg = this.owner.getChildByName("level_bg"),
                this.weapon_bg = this.owner.getChildByName("weapon_bg"),
                this.weapon_icon = this.owner.getChildByName("weapon_icon"),
                this.level = this.owner.getChildByName("weapon_level"),
                this.award = this.owner.getChildByName("award_gold"),
                this.confirm = this.owner.getChildByName("confirm"),
                this.weapon_name = this.owner.getChildByName("weapon_name"),
                this.weapon_atk_name = this.owner.getChildByName("weapon_atk_name"),
                this.weapon_atk_speed_name = this.owner.getChildByName("weapon_atk_speed_name"),
                this.weapon_atk = this.owner.getChildByName("weapon_atk"),
                this.weapon_atk_speed = this.owner.getChildByName("weapon_atk_speed"),
                this.color_boxs.push(this.weapon_name, this.weapon_atk_name, this.weapon_atk_speed_name, this.weapon_atk, this.weapon_atk_speed, this.confirm, this.award)
        }
        initView() {
            null != this.params && null != this.params || (this.params = [[], [0, 1]]);
            let e = this.params[1][1],
                t = this.params[1][0];
            switch (t) {
                case 1:
                    t = 2;
                    break;
                case 2:
                    t = 1
            }
            let s = C.Instance.getItemConfig()[t][e - 1],
                i = s.Item_BGColor;
            switch (this.level_bg.loadImage("item/item_level_mark_" + i + ".png"), this.weapon_icon.loadImage("icon/" + this.weapon_type_strs[t] + "_" + e + ".png"), this.weapon_bg.skin = "item/item_level_" + i + ".png", this.level.text = e + "", this.weapon_name.text = s.Item_Name, t) {
                case 0:
                    this.weapon_atk_name.visible = !0,
                        this.weapon_atk.visible = !0,
                        this.weapon_atk_speed_name.text = "攻速",
                        this.weapon_atk_name.text = "秒伤";
                    let a = s.Item_Parameter;
                    this.weapon_atk.text = s.Item_attri;
                    let n = a[1] / a[3] * 1e3;
                    this.weapon_atk_speed.text = n.toFixed(1) + "/秒";
                    break;
                case 2:
                    this.weapon_atk_name.visible = !1,
                        this.weapon_atk.visible = !1,
                        this.weapon_atk_speed_name.text = "护甲",
                        this.weapon_atk_speed.text = s.Item_attri;
                    break;
                case 1:
                    this.weapon_atk_name.visible = !1,
                        this.weapon_atk.visible = !1,
                        this.weapon_atk_speed_name.text = "生命",
                        this.weapon_atk_speed.text = s.Item_attri
            }
            this.award.text = "+" + s.Award,
                this.award_gold = s.Award,
                this.color_boxs.forEach(e => {
                    e.alpha = 0,
                        Laya.Tween.to(e, {
                            alpha: 1
                        }, 500)
                })
        }
        addButtonEffListener() {
            ee.buttonEff(this.confirm, this, this.closeSelf)
        }
        closeSelf() {
            X.Instance.gold += this.award_gold,
                super.closeSelf(),
                _.Dispatch(g.ShowGoldEff, this.award_gold)
        }
    }
    class It {
        constructor() {}
        static get Instance() {
            return null != this.instance && null != this.instance || (this.instance = new It),
                this.instance
        }
        createPrefab(e) {
            let t = Laya.loader.getRes(e),
                s = null,
                i = null;
            return null != t && ((s = new Laya.Prefab).json = t, i = Laya.Pool.getItemByCreateFun(e, s.create, s)),
                i
        }
        recoverPrefab(e, s) {
            t.cycleObject(e, s)
        }
    }
    class wt extends Laya.Box {
        constructor() {
            super(...arguments),
                this.weapon_shop_flag = !1
        }
        initValue(e, t, s, a = !1, n, o) {
            null != this.weaponItem && null != this.weaponItem || (this.weaponItem = It.Instance.createPrefab("prefabs/WeaponItem/WeaponItem.json"), this.addChild(this.weaponItem), this.weaponItem.pos(0, 0), this.lock_box = this.weaponItem.getChildByName("lock"), this.unlock_box = this.weaponItem.getChildByName("unlock"), this.weapon = this.unlock_box.getChildByName("weapon"), this.weaponName = this.unlock_box.getChildByName("weapon_name"), this.shop = this.unlock_box.getChildByName("shop"), this.shop_gold = this.shop.getChildByName("shop_gold"), this.weapon_level = this.unlock_box.getChildByName("weapon_level"), ee.buttonEff(this.shop, this, this.shopWeapon)),
                this.weapon_type = o,
                a ? (this.lock_box.visible = !0, this.unlock_box.visible = !1) : (this.lock_box.visible = !1, this.unlock_box.visible = !0, this.weaponName.text = e, this.weapon.loadImage(t), this.shop_gold.text = i.changeGoldUnit(s), this.weapon_level.text = n + 1 + "", this.level = n, X.Instance.gold >= s ? (this.weapon_shop_flag = !0, this.shop.skin = "common/button_green.png", this.shop_gold.color = "#FBFD47") : (this.weapon_shop_flag = !1, this.shop.skin = "common/button_grey.png", this.shop_gold.color = "#9B9B9B"), this.count_shop_gold = s)
        }
        shopWeapon() {
            let e = B.Instance.judgeKnaspaceEmpty(this.weapon_type);
            if (!this.weapon_shop_flag || !e) {
                if (e) {
                    if (!k.Instance.add_speed_flag) {
                        let e = X.Instance.getAddGoldSpeedInfo();
                        B.Instance.every_day_add_speed_count[1] < e[1] && (k.Instance.add_speed_flag || _.Dispatch(g.AppendBox, "prefabs/Popp/GoldSpeedPopp.json"))
                    }
                } else
                    u.getLanguageType() ? _.Dispatch(g.AppendTextTip, "当前装备已满!", 1e3) : _.Dispatch(g.AppendTextTip, "Current equipment is full！", 1e3);
                return
            }
            u.getLanguageType() ? _.Dispatch(g.AppendTextTip, "购买成功!", 1e3) : _.Dispatch(g.AppendTextTip, "Purchase success ！", 1e3),
                X.Instance.gold -= this.count_shop_gold,
                B.Instance.weapon_shop_count[this.weapon_type][this.level]++;
            let t = C.Instance.getItemConfig()[this.weapon_type][this.level].ItemCost_GrowUp;
            this.count_shop_gold = Math.floor(this.count_shop_gold * t),
                this.updateButton(),
                this.shop_gold.text = i.changeGoldUnit(this.count_shop_gold),
                _.Dispatch(g.ShopWeapon, this.level + 1),
                _.Dispatch(g.UpdateStoreGold)
        }
        updateButton() {
            X.Instance.gold >= this.count_shop_gold ? (this.weapon_shop_flag = !0, this.shop.skin = "common/button_green.png", this.shop_gold.color = "#FBFD47") : (this.weapon_shop_flag = !1, this.shop.skin = "common/button_grey.png", this.shop_gold.color = "#9B9B9B")
        }
        onDisable() {}
        onEnable() {}
    }
    class Lt extends Qe {
        constructor() {
            super(...arguments),
                this.languageCn = !0
        }
        onAwake() {
            super.onAwake(),
            u.Language == h.EN && (this.languageCn = !1)
        }
        onEnable() {
            super.onEnable(),
                this.initOver = !0,
                this.weapon_data = B.Instance.getMaxWeapon()(),
                this.gold.text = i.changeGoldUnit(X.Instance.gold),
                this.max_weapon = We.Instance.Weapon_scope_max
        }
        initView() {
            super.initView(),
            this.initOver && this.addList(this.params[1])
        }
        updateGold() {
            this.gold.text = i.changeGoldUnit(X.Instance.gold)
        }
        addList(e) {
            this.weaponList.itemRender = wt,
                this.weaponType = e,
                this.arrData = [],
                this.arrData.length = 20,
                this.weaponList.array = this.arrData,
                this.weaponList.vScrollBarSkin = "",
                this.weaponList.renderHandler = new Laya.Handler(this, this.onRender);
            let t = "";
            switch (e) {
                case 0:
                    t = "gun";
                    break;
                case 1:
                    t = "helmet",
                        this.weaponType = 2;
                    break;
                case 2:
                    t = "cloth",
                        this.weaponType = 1
            }
            this.weapon_src = "icon/" + t
        }
        onRender(e, t) {
            null != this.config && null != this.config || (this.config = C.Instance.getItemConfig());
            let s = 0;
            switch (this.weaponType) {
                case 1:
                    s = 2;
                    break;
                case 2:
                    s = 1
            }
            if (this.max_weapon > t) {
                let s = "";
                s = this.languageCn ? this.config[this.weaponType][t].Item_Name : this.config[this.weaponType][t].Item_NameEN;
                let i = this.config[this.weaponType][t].Item_Cost,
                    a = this.config[this.weaponType][t].ItemCost_GrowUp,
                    n = B.Instance.weapon_shop_count[this.weaponType][t];
                i = Math.floor(i * Math.pow(a, n)),
                    e.initValue(s, this.weapon_src + "_" + (t + 1) + ".png", i, !1, t, this.weaponType)
            } else
                e.initValue("", "", 0, !0, t, this.weaponType)
        }
        getChildren() {
            this.weaponList = this.owner.getChildByName("weapon_list"),
                this.gold = this.owner.getChildByName("gold"),
                this.closeBtn = this.owner.getChildByName("close_self")
        }
        addListener() {
            this.closeBtn.on(Laya.Event.CLICK, this, this.closeSelf),
                _.AddListener(g.UpdateStoreGold, this, this.updateGold)
        }
        removeListener() {
            this.closeBtn.off(Laya.Event.CLICK, this, this.closeSelf),
                _.RemoveListener(g.UpdateStoreGold, this, this.updateGold)
        }
        onDisable() {
            super.onDisable(),
                B.Instance.saveGameData(),
                _.Dispatch(g.UpdateGoldMain)
        }
        closeSelf() {
            super.closeSelf(),
                o.playSceneSound("button")
        }
    }
    class vt extends Laya.Script {
        onEnable() {
            this.image = this.owner,
                this.localizeContext()
        }
        localizeContext() {
            u.Language == h.EN && this.image && (this.setEnTexture(), this.enPosX && (this.image.x = this.enPosX), this.enPosY && (this.image.y = this.enPosY))
        }
        setEnTexture() {
            let e = Laya.loader.getRes(this.enUrl);
            e ? (this.image.texture = e, this.image.size(e.width, e.height)) : Laya.loader.load(this.enUrl, Laya.Handler.create(this, () => {
                let e = Laya.loader.getRes(this.enUrl);
                e ? (this.image.texture = e, this.image.size(e.width, e.height)) : console.error("找不到图片：", this.enUrl)
            }))
        }
    }
    class Ct {
        constructor(e = 0, t = 0) {
            this.x = e,
                this.y = t
        }
        get Length() {
            let e = Math.pow(this.x, 2) + Math.pow(this.y, 2);
            return Math.sqrt(e)
        }
        Equals(e) {
            return this.x == e.x && this.y == e.y
        }
        Reverse() {
            return new Ct(-this.x, -this.y)
        }
        Scale(e) {
            return new Ct(this.x * e, this.y * e)
        }
        DistanceWithOther(e) {
            let t = Math.pow(this.x - e.x, 2) + Math.pow(this.y - e.y, 2);
            return Math.sqrt(t)
        }
        AddOtherPos(e) {
            return new Ct(this.x + e.x, this.y + e.y)
        }
        DifferenceOther(e) {
            return new Ct(e.x - this.x, e.y - this.x)
        }
        static Zero() {
            return new Ct(0, 0)
        }
        static Equals_Two(e, t) {
            return e.x == t.x && e.y == t.y
        }
        static Distance_Two(e, t) {
            let s = Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2);
            return Math.sqrt(s)
        }
        static Add_Two(e, t) {
            return new Ct(e.x + t.x, e.y + t.y)
        }
        static Difference_Two(e, t) {
            return new Ct(t.x - e.x, t.y - e.y)
        }
        static Scale(e, t) {
            return new Ct(e.x * t, e.y * t)
        }
        static Normalize(e) {
            let t = 1 / Math.sqrt(Math.pow(e.x, 2) + Math.pow(e.y, 2));
            return new Ct(e.x * t, e.y * t)
        }
        static VectorToAngle(e) {
            if (0 == e.x)
                return;
            let t = 180 * Math.atan(e.y / e.x) / Math.PI;
            return e.x > 0 && e.y > 0 ? t -= 90 : t = e.x < 0 && e.y > 0 ? 90 + t : e.x > 0 && e.y < 0 ? -90 : 90,
                t
        }
    }
    class Tt extends Qe {
        constructor() {
            super(...arguments),
                this.selectBtnIndex = 0,
                this.dragFlag = !1,
                this.currentMoveGoodsIndex = -1,
                this.goodsNames = ["gun", "helmet", "cloth"],
                this.playerIndex = 0,
                this.shoot_time = 0,
                this.equit_index = [0, 0, 0],
                this.lock_flag = !1,
                this.init_over = !1,
                this.shop_over = !0,
                this.finger_tip_flag = !1,
                this.up_level_lv = 0,
                this.shoot_interval = 0,
                this.weapon_title = ["武器", "头盔", "衣服"],
                this.currMinWeaponJs = [],
                this.currMinWeapon = [],
                this.complex_flag = !1
        }
        onAwake() {
            this.boxPos = [],
                this.callFun = [],
                this.showGoods = [],
                this.goods_tips = [],
                this.goods_text_tips = [],
                super.onAwake(),
                this.firstPos = [15, 15],
                this.intervalPosY = 135,
                this.intervalPosX = 139,
                this.showKnaspackWeaponBg();
            let e = Laya.loader.getRes("prefabs/goods_item.json");
            this.finger = new Laya.Image,
                this.finger.skin = "item/finger.png",
                this.owner.addChild(this.finger),
                this.finger.visible = !1,
                this.goods_item = new Laya.Prefab,
                this.goods_item.json = e,
                this.playeChangeSkinFunc = m.Instance.addPlayerSK(this.playerShow, 0, 4, 0, 0, !1);
            let t = B.Instance.getMaxWeapon()();
            this.playeChangeSkinFunc[0](t[0] - 1, t[1] - 1, t[2] - 1, 0, 4);
            let s = i.changeGoldUnit(X.Instance.gold);
            this.gold.text = s + "",
            X.Instance.level >= 10 && !this.lock_flag && (this.lock_flag = !0, this.lock_common_btn.visible = !1, this.lock_store_btn.visible = !1, this.updateCommonShopInfo(), ee.buttonEff(this.weaponStore, this, this.weaponStorePage), ee.buttonEff(this.commonShop, this, this.commonShopWeapon)),
                ee.buttonEff(this.closeBtn, this, this.closeSelf),
                ee.buttonEff(this.openTreasure, this, this.openTreasurePage),
                this.up_level_lv = X.Instance.getGlobalConfigInfo().straightup_probability
        }
        onEnable() {
            _.Dispatch(g.HideSafeBox);
            this.closeBtn.parent;
            super.onEnable(),
                Laya.timer.once(2e3, this, () => {
                    this.finger_tip_flag = !0,
                        this.complexTip()
                }),
                this.finger.visible = !1,
                this.changeShowGoods(0),
                this.changeBtnShow(0, !1),
                this.dragFlag = !1,
                B.Instance.saveKnaspceArray(),
                this.gold.text = i.changeGoldUnit(X.Instance.gold),
                this.recover_tip.visible = !1,
                this.recover.scaleX = .7,
                this.recover.scaleY = .7,
                this.changePlayer(),
            X.Instance.level >= 10 && !this.lock_flag && (this.lock_flag = !0, this.lock_common_btn.visible = !1, this.lock_store_btn.visible = !1, this.updateCommonShopInfo(), ee.buttonEff(this.weaponStore, this, this.weaponStorePage), ee.buttonEff(this.commonShop, this, this.commonShopWeapon)),
                Laya.timer.loop(200, this, this.updateCommonShopInfo),
                this.refreshTreasureUI(),
                this.init_over = !0,
                Laya.stage.on(Laya.Event.MOUSE_UP, this, this.dragEnd),
                Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.dragStart)
        }
        shakeTreasure() {
            this.treasureTween = Laya.Tween.to(this.openTreasure, {
                scaleX: .9,
                scaleY: .9,
                rotation: 10
            }, 500, null, Laya.Handler.create(this, () => {
                this.treasureTween = Laya.Tween.to(this.openTreasure, {
                    scaleX: 1,
                    scaleY: 1,
                    rotation: 0
                }, 500, null, Laya.Handler.create(this, () => {
                    this.treasureTween = Laya.Tween.to(this.openTreasure, {
                        scaleX: .9,
                        scaleY: .9,
                        rotation: -10
                    }, 500, null, Laya.Handler.create(this, () => {
                        this.treasureTween = Laya.Tween.to(this.openTreasure, {
                            scaleX: 1,
                            scaleY: 1,
                            rotation: 0
                        }, 500, null, Laya.Handler.create(this, () => {
                            this.shakeTreasure()
                        }))
                    }))
                }))
            }))
        }
        resetShakeTreasure() {
            this.openTreasure.scale(1, 1),
                this.openTreasure.rotation = 0,
            this.treasureTween && (this.treasureTween.clear(), this.treasureTween = null)
        }
        refreshTreasureUI() {
            this.init_over && this.refreshKnaspaceUI();
            let e = B.Instance.treasureFullArr.length > 0;
            if (this.resetShakeTreasure(), e)
                return this.treasure_tip_icon.loadImage("common/tip_dot.png"), this.treasure_num.visible = !1, void this.shakeTreasure();
            let t = B.Instance.treasureCount.length;
            t > 0 ? (this.treasure_tip_icon.loadImage("item/safe_number.png"), this.treasure_num.visible = !0, this.treasure_num.text = t + "") : (this.treasure_tip_icon.loadImage("item/safe_get.png"), this.treasure_num.visible = !1)
        }
        changePlayer() {
            let e = B.Instance.getMaxWeapon();
            e = e();
            let t = C.Instance.getItemConfig();
            this.playeChangeSkinFunc[0](e[0] - 1, e[1] - 1, e[2] - 1, 0, 4),
                this.shootSpeedShow();
            for (let s = 0; s < e.length; s++) {
                const i = e[s] - 1;
                switch (s) {
                    case 0:
                        this.atk.text = t[s][i].Item_attri + "";
                        break;
                    case 1:
                        this.defend.text = t[s + 1][i].Item_attri + "";
                        break;
                    case 2:
                        this.hp.text = t[s - 1][i].Item_attri + ""
                }
            }
        }
        shootSpeedShow() {
            Laya.timer.clear(this, this.shootShow),
                Laya.timer.clear(this, this.playShootAnim);
            let e = B.Instance.getMaxWeapon()()[0];
            this.interval = C.Instance.getItemConfig()[0][e - 1].Item_Parameter,
                this.shoot_time = m.Instance.getPlayerShootTimer(),
                Laya.timer.loop(this.interval[3], this, this.shootShow)
        }
        shootShow() {
            this.shoot_interval = this.interval[1],
                Laya.timer.loop(this.shoot_time, this, this.playShootAnim)
        }
        playShootAnim() {
            this.shoot_interval <= 0 ? Laya.timer.clear(this, this.playShootAnim) : (this.playeChangeSkinFunc[1].play(0, !1), this.playeChangeSkinFunc[2].play(4, !1), this.shoot_interval--)
        }
        updateCommonShopInfo() {
            this.weapon_info = We.Instance.commonShop(this.selectBtnIndex);
            let e = i.changeGoldUnit(this.weapon_info[1]);
            this.shop_gold_num.text = e,
                this.shop_weapon_level.text = this.weapon_info[0] + "级" + this.weapon_title[this.selectBtnIndex],
                e = i.changeGoldUnit(X.Instance.gold),
                this.gold.text = e,
                X.Instance.gold < this.weapon_info[1] ? (this.shop_gold_num.color = "#999999", this.shop_weapon_level.color = "#999999", this.commonShop.skin = "common/button_grey.png") : (this.shop_gold_num.color = "#FBFD47", this.shop_weapon_level.color = "#037800", this.commonShop.skin = "common/button_green.png")
        }
        getChildren() {
            let e = this.owner.getChildByName("bg"),
                t = this.owner.getChildByName("button_box");
            this.weaponBtn = t.getChildByName("weaponBtn"),
                this.helmetBtn = t.getChildByName("helmetBtn"),
                this.armorBtn = t.getChildByName("armorBtn"),
                this.weaponStore = t.getChildByName("weapon_store"),
                this.recover = this.owner.getChildByName("recover"),
                this.commonShop = t.getChildByName("common_shop"),
                this.openTreasure = t.getChildByName("open_treasure"),
                this.closeBtn = t.getChildByName("close_self"),
                this.playerShow = e.getChildByName("player_show"),
                this.armor_icon = t.getChildByName("armor_icon"),
                this.weapon_icon = t.getChildByName("weapon_icon"),
                this.helmet_icon = t.getChildByName("helmet_icon"),
                this.goodsBox = this.owner.getChildByName("knapsackBox"),
                this.hp = e.getChildByName("hp"),
                this.defend = e.getChildByName("defend"),
                this.atk = e.getChildByName("atk"),
                this.gold = e.getChildByName("gold");
            let s = t.getChildByName("weapon_complex_tip"),
                i = t.getChildByName("armor_complex_tip"),
                a = t.getChildByName("helmet_complex_tip");
            this.goods_tips.push(s, i, a);
            let n = t.getChildByName("weapon_tip"),
                o = t.getChildByName("armor_tip"),
                h = t.getChildByName("helmet_tip");
            this.goods_text_tips.push(n, o, h),
                this.lock_common_btn = t.getChildByName("lock_common_shop"),
                this.lock_store_btn = t.getChildByName("lock_store"),
                this.treasure_num = this.openTreasure.getChildByName("treasure_num"),
                this.treasure_tip_icon = this.openTreasure.getChildByName("treasure_tip_icon"),
                this.shop_weapon_level = this.commonShop.getChildByName("level_shop_tip"),
                this.shop_gold_num = this.commonShop.getChildByName("shop_num"),
                this.recover_tip = e.getChildByName("recover_tip"),
                this.tip = this.owner.getChildByName("tip")
        }
        addListener() {
            this.weaponBtn.on(Laya.Event.CLICK, this, this.changeShowGoods, [0, !0]),
                this.helmetBtn.on(Laya.Event.CLICK, this, this.changeShowGoods, [2, !0]),
                this.armorBtn.on(Laya.Event.CLICK, this, this.changeShowGoods, [1, !0]),
                _.AddListener(g.ShopWeapon, this, this.shopWeaponSuccess),
                _.AddListener(g.RefreshTreasure, this, this.refreshTreasureUI),
                _.AddListener(g.RefreshKnaspace, this, this.refreshKnaspace),
                _.AddListener(g.RefreshKnaspaceUI, this, this.refreshKnaspaceUI)
        }
        removeListener() {
            this.weaponBtn.off(Laya.Event.CLICK, this, this.changeShowGoods),
                this.helmetBtn.off(Laya.Event.CLICK, this, this.changeShowGoods),
                this.armorBtn.off(Laya.Event.CLICK, this, this.changeShowGoods),
                _.RemoveListener(g.ShopWeapon, this, this.shopWeaponSuccess),
                _.RemoveListener(g.RefreshTreasure, this, this.refreshTreasureUI),
                _.RemoveListener(g.RefreshKnaspace, this, this.refreshKnaspace),
                _.RemoveListener(g.RefreshKnaspaceUI, this, this.refreshKnaspaceUI)
        }
        shopWeaponSuccess(e) {
            let t = B.Instance.knaspaceArray[this.selectBtnIndex];
            for (let s = 0; s < t.length; s++) {
                if (0 == t[s]) {
                    t[s] = e[0],
                        this.changeShowGoods(this.selectBtnIndex);
                    break
                }
            }
        }
        closeSelf() {
            super.closeSelf(),
                B.Instance.saveKnaspceArray(),
                _.Dispatch(g.MainPlayerUpdate),
                _.Dispatch(g.UpdateMainUITip)
        }
        recoverWeapon(e) {
            let t = this.showGoods.indexOf(e);
            if (this.equit_index[this.selectBtnIndex] == t)
                return;
            let s = e.x + this.goodsBox.x,
                i = e.y + this.goodsBox.y;
            if (Math.abs(s + 60 - this.recover.x) < 60 && Math.abs(i + 60 - this.recover.y) < 60) {
                e.removeSelf(),
                    o.playSceneSound("drop_goods"),
                    B.Instance.knaspaceArray[this.selectBtnIndex][t] = 0,
                    this.showGoods[t] = null;
                let s = parseInt(e.name.split("_")[1]),
                    i = C.Instance.getItemConfig()[this.selectBtnIndex][s - 1].Item_Spend;
                return X.Instance.gold += i,
                    m.Instance.showGoldAward(this.owner, i, 130, 100),
                    this.findMinLevelWeapon(),
                    _.Dispatch(g.ButtonCounnt, c.GameButtonName.KNASPACE_RECOVER_BTN),
                    !0
            }
            return !1
        }
        commonShopWeapon() {
            _.Dispatch(g.ButtonCounnt, c.GameButtonName.KNASPACE_WEAPON_SHOP_BTN + this.selectBtnIndex);
            let e = B.Instance.judgeKnaspaceEmpty(this.selectBtnIndex);
            if (e) {
                if (X.Instance.gold >= this.weapon_info[1]) {
                    X.Instance.gold -= this.weapon_info[1];
                    let t = Math.random();
                    if ((e = B.Instance.judgeDaySharedCount(c.ShareConfig.STRAIGHT_UP)) && t < this.up_level_lv && this.weapon_info[0] < 17)
                        return _.Dispatch(g.AppendBox, "prefabs/Popp/WeaponLevelUpPopp.json", this.selectBtnIndex, this.weapon_info[0]), void _.Dispatch(g.ButtonCounnt, c.GameButtonName.STRAIGHT_LEVEL_UP);
                    B.Instance.weapon_shop_count[this.selectBtnIndex][this.weapon_info[0] - 1]++;
                    for (let e = 0; e < B.Instance.knaspaceArray[this.selectBtnIndex].length; e++) {
                        if (0 == B.Instance.knaspaceArray[this.selectBtnIndex][e]) {
                            B.Instance.knaspaceArray[this.selectBtnIndex][e] = this.weapon_info[0],
                                this.createWeaponItem(this.weapon_info[0], e, 100);
                            break
                        }
                    }
                } else
                    k.Instance.add_speed_flag || _.Dispatch(g.AppendBox, "prefabs/Popp/GoldSpeedPopp.json");
                this.updateCommonShopInfo()
            } else
                _.Dispatch(g.AppendTextTip, "该装备栏已满", 1e3)
        }
        openTreasurePage() {
            B.Instance.treasureFullArr;
            if (B.Instance.treasureFullArr.length > 0)
                return We.Instance.setTreasureInfo(B.Instance.treasureFullArr), void _.Dispatch(g.AppendBox, "prefabs/Popp/OpenTreasurePopp.json");
            if (B.Instance.treasureCount.length > 0) {
                let e = B.Instance.treasureCount.pop();
                this.refreshTreasureUI(),
                    B.Instance.saveTreasureCount(),
                    We.Instance.getTreasureData(e),
                    _.Dispatch(g.AppendBox, "prefabs/Popp/OpenTreasurePopp.json")
            } else
                _.Dispatch(g.AppendBox, "prefabs/Popp/ShopTreasurePopp.json")
        }
        weaponStorePage() {
            _.Dispatch(g.AppendBox, "prefabs/Popp/WeaponStorePopp.json", this.selectBtnIndex)
        }
        sortCurrentGoods() {
            let e = B.Instance.knaspaceArray[this.selectBtnIndex];
            for (let t = 1; t < e.length; t++) {
                let s = t - 1,
                    i = e[t];
                for (; i > e[s] && s >= 0; )
                    e[s + 1] = e[s], s--;
                s != t - 1 && (e[s + 1] = i)
            }
        }
        findMinLevelWeapon() {
            for (let e = 0; e < this.currMinWeaponJs.length; e++) {
                const t = this.currMinWeaponJs[e];
                t && t.showMinWeaponComposeTip(!1)
            }
            let e = B.Instance.knaspaceArray[this.selectBtnIndex],
                t = [];
            for (let e = 0; e < 20; e++)
                t[e] = 0;
            for (let s = 0; s < e.length; s++) {
                t[e[s]]++
            }
            let s = 0,
                i = 0;
            for (let e = 1; e < t.length; e++) {
                if (t[e] > 1) {
                    s = e;
                    break
                }
            }
            if (this.currMinWeaponJs = [], this.currMinWeapon = [], !(s <= 0))
                for (let t = 0; t < e.length; t++)
                    if (e[t] == s && this.showGoods[t]) {
                        i++;
                        let e = this.showGoods[t].getComponent(Ve);
                        if (e.showMinWeaponComposeTip(!0), this.currMinWeaponJs.push(e), this.currMinWeapon.push(this.showGoods[t]), 2 == i)
                            break
                    }
        }
        changeBtnShow(e, t = !0) {
            t && this.sortCurrentGoods();
            let s = B.Instance.getWeaponComplex();
            for (let t = 0; t < this.goods_tips.length; t++) {
                const i = this.goods_tips[t];
                e == t ? (i.visible = !1, this.goods_text_tips[t].color = "#FFFFFF") : (this.goods_text_tips[t].color = "#665499", i.visible = s[t])
            }
            switch (e) {
                case 0:
                    this.armorBtn.alpha = 0,
                        this.helmetBtn.alpha = 0,
                        this.weaponBtn.alpha = 1,
                        this.weapon_icon.skin = "item/item_weapon_1.png",
                        this.armor_icon.skin = "item/item_helmet_2.png",
                        this.helmet_icon.skin = "item/item_cloth_2.png";
                    break;
                case 1:
                    this.armorBtn.alpha = 1,
                        this.helmetBtn.alpha = 0,
                        this.weaponBtn.alpha = 0,
                        this.weapon_icon.skin = "item/item_weapon_2.png",
                        this.armor_icon.skin = "item/item_helmet_1.png",
                        this.helmet_icon.skin = "item/item_cloth_2.png";
                    break;
                case 2:
                    this.armorBtn.alpha = 0,
                        this.helmetBtn.alpha = 1,
                        this.weaponBtn.alpha = 0,
                        this.weapon_icon.skin = "item/item_weapon_2.png",
                        this.armor_icon.skin = "item/item_helmet_2.png",
                        this.helmet_icon.skin = "item/item_cloth_1.png"
            }
        }
        showKnaspackWeaponBg() {
            let e = null;
            for (let t = 0; t < 12; t++) {
                (e = new Laya.Image).skin = "item/item_none.png",
                    e.sizeGrid = "31,21,26,24",
                    e.width = 126,
                    e.height = 126;
                let s = Math.floor(t / 4);
                e.pos(this.firstPos[0] + t % 4 * this.intervalPosX, this.firstPos[1] + s * this.intervalPosY),
                    this.goodsBox.addChild(e)
            }
        }
        refreshKnaspace() {
            this.changeShowGoods(this.selectBtnIndex, !0)
        }
        refreshKnaspaceUI() {
            this.changeShowGoods(this.selectBtnIndex, !1)
        }
        changeShowGoods(e, s = !1) {
            s && (o.playSceneSound("button"), this.changeBtnShow(e)),
                We.Instance.Names = this.goodsNames[e],
                this.selectBtnIndex = e;
            let i = B.Instance.getMaxWeapon()()[e],
                a = B.Instance.knaspaceArray[e];
            for (let e = 0; e < a.length; e++) {
                const s = a[e];
                0 !== s ? i = this.createWeaponItem(s, e, i) : (null !== this.showGoods[e] && void 0 !== this.showGoods[e] && (t.cycleObject("goods", this.showGoods[e]), this.showGoods[e].removeSelf()), this.showGoods[e] = null)
            }
            this.findMinLevelWeapon()
        }
        createWeaponItem(e, t, s) {
            null !== this.showGoods[t] && void 0 !== this.showGoods[t] || (this.showGoods[t] = Laya.Pool.getItemByCreateFun("goods", this.goods_item.create, this.goods_item), this.goodsBox.addChild(this.showGoods[t]));
            let i = this.showGoods[t].getComponent(Ve);
            e >= s ? (this.equit_index[this.selectBtnIndex] = t, i.init(this.selectBtnIndex, e, !0), s++) : i.init(this.selectBtnIndex, e, !1),
                this.showGoods[t].name = "goods_" + e;
            let a = Math.floor(t / 4);
            return this.showGoods[t].pos(this.firstPos[0] + t % 4 * this.intervalPosX, this.firstPos[1] + a * this.intervalPosY),
                s
        }
        showSelectBox() {}
        dragStart() {
            if (Laya.timer.clear(this, this.updateFinger), this.finger_tip_flag = !1, this.dragFlag)
                return;
            this.dragFlag = !0;
            let t = new Ct(Laya.stage.mouseX, Laya.stage.mouseY),
                s = new Laya.Point(t.x, t.y),
                i = this.goodsBox.globalToLocal(s, !0),
                a = Math.floor(i.x / this.intervalPosX),
                n = Math.floor(i.y / this.intervalPosY),
                o = a + 4 * n;
            if (a > 3 || n > 2 || a < 0 || n < 0 || !this.showGoods[o])
                return void(this.dragFlag = !1);
            e.l("row == " + a + "  col == " + n + " index ==" + o, this.showGoods[o]);
            let h = this.showGoods[o];
            B.Instance.judgeKnaspaceEmpty(this.selectBtnIndex) || (this.recover_tip.visible = !0, this.recover.scaleX = 1, this.recover.scaleY = 1),
            B.Instance.judgeKnaspaceEmpty(this.selectBtnIndex) || (this.recover_tip.visible = !0, this.recover.scaleX = 1, this.recover.scaleY = 1),
                this.curr_weapon_img = h,
                h.zOrder = 100,
                this.currentMoveGoodsIndex = o;
            h.x,
                h.y;
            this.callFun[o] = (() => {
                let e = Math.floor(o / 4),
                    t = this.firstPos[0] + o % 4 * this.intervalPosX,
                    s = this.firstPos[1] + e * this.intervalPosY;
                Laya.Tween.to(h, {
                    x: t,
                    y: s
                }, 100, null)
            }),
                this.curr_mouse_point = i,
                this.curr_weapon_img.pos(this.curr_mouse_point.x - 45, this.curr_mouse_point.y - 45)
        }
        onUpdate() {
            if (!this.dragFlag)
                return;
            let e = new Ct(Laya.stage.mouseX, Laya.stage.mouseY),
                t = new Laya.Point(e.x, e.y),
                s = this.goodsBox.globalToLocal(t, !0);
            this.curr_mouse_point = s,
                this.curr_weapon_img.pos(this.curr_mouse_point.x - 45, this.curr_mouse_point.y - 45)
        }
        dragBorder(e) {
            if (!this.dragFlag)
                return;
            let t = this.showGoods.indexOf(e);
            this.callFun[t](),
                e.zOrder = t,
                this.dragFlag = !1
        }
        updateFinger() {
            this.finger_tip_flag = !0,
                this.complexTip()
        }
        dragEnd() {
            if (Laya.timer.clear(this, this.updateFinger), this.finger_tip_flag = !1, Laya.timer.once(2e3, this, this.updateFinger), !this.dragFlag)
                return;
            let e = this.curr_weapon_img;
            if (this.recoverWeapon(e))
                return this.recover_tip.visible = !1, this.recover.scaleX = .7, this.recover.scaleY = .7, void(this.dragFlag = !1);
            if (this.recover.scaleX = .7, this.recover.scaleY = .7, this.recover_tip.visible = !1, e.x < this.firstPos[0] - this.intervalPosX / 2)
                return void this.dragBorder(e);
            if (e.x > this.firstPos[0] + 3 * this.intervalPosX + this.intervalPosX / 2)
                return void this.dragBorder(e);
            if (e.y > this.firstPos[1] + 2 * this.intervalPosY + this.intervalPosY / 2)
                return void this.dragBorder(e);
            if (e.y < this.firstPos[1] - this.intervalPosY / 2)
                return void this.dragBorder(e);
            let t = Math.abs(e.x - this.firstPos[0]) / this.intervalPosX,
                s = Math.abs(e.y - this.firstPos[1]) / this.intervalPosY,
                i = t % 1,
                a = s % 1;
            t = Math.floor(t),
                s = Math.floor(s),
            i >= .5 && (t += 1),
            a >= .5 && (s += 1),
                this.changePos(e, t, s)
        }
        changePos(e, s, i) {
            let a = s + 4 * i,
                n = null == this.showGoods[a] || null == this.showGoods[a] ? -1 : parseInt(this.showGoods[a].name.split("_")[1]),
                h = parseInt(e.name.split("_")[1]);
            this.goodsNames[this.selectBtnIndex];
            if (this.complex_flag = !1, n == h && this.showGoods[a] !== e) {
                let s = C.Instance.getItemConfig()[this.selectBtnIndex];
                if (null == s[h] || null == s[h])
                    return this.dragBorder(e), void this.showTip();
                let i = c.GameButtonName.GUN_COMPLEX + this.selectBtnIndex;
                _.Dispatch(g.ButtonCounnt, i),
                    this.complex_flag = !0,
                    o.playSceneSound("weapon_complex"),
                    t.cycleObject("goods", this.showGoods[a]),
                    this.showGoods[a].removeSelf();
                let n = e.getComponent(Ve),
                    r = !1;
                if (++h > B.Instance.getMaxWeapon()()[this.selectBtnIndex]) {
                    r = !0;
                    let e = this.showGoods[this.equit_index[this.selectBtnIndex]];
                    if (e) {
                        e.getComponent(Ve).showEquit(!1)
                    }
                    this.equit_index[this.selectBtnIndex] = a,
                        _.Dispatch(g.AppendBox, "prefabs/Popp/WeaponMaxPopp.json", [this.selectBtnIndex, h])
                }
                n.init(this.selectBtnIndex, h, r),
                    e.name = "goods_" + h,
                    B.Instance.knaspaceArray[this.selectBtnIndex][a] = h
            } else if (-1 !== n)
                return void this.dragBorder(e);
            e.pos(s * this.intervalPosX + this.firstPos[0], i * this.intervalPosY + this.firstPos[1]);
            let r = this.showGoods.indexOf(e);
            if (this.showGoods[r] = null, this.showGoods[a] = e, B.Instance.knaspaceArray[this.selectBtnIndex][r] = 0, B.Instance.knaspaceArray[this.selectBtnIndex][a] = h, e.zOrder = a, this.equit_index[this.selectBtnIndex] == r && (this.equit_index[this.selectBtnIndex] = a), this.complex_flag) {
                this.showGoods[a].getComponent(Ve).showComponseTip2(),
                    this.findMinLevelWeapon()
            }
            this.changePlayer(),
                this.dragFlag = !1
        }
        onDisable() {
            super.onDisable(),
                Laya.timer.clear(this, this.updateCommonShopInfo),
                _.Dispatch(g.UpdateGoldMain),
                _.Dispatch(g.UpdateGoldAward),
                _.Dispatch(g.ShowBannerAD, 0)
        }
        showTip() {
            this.tip.visible = !0,
                Laya.Tween.to(this.tip, {
                    y: 400
                }, 500, null, Laya.Handler.create(this, () => {
                    this.tip.visible = !1,
                        this.tip.y = 606
                }))
        }
        complexTip() {
            if (!this.finger_tip_flag || this.currMinWeapon.length < 2)
                return void(this.finger_tween && (this.finger_tween.clear(), this.finger.visible = !1));
            let e = -50,
                t = 30;
            this.currMinWeapon[0].x == this.currMinWeapon[1].x && (e = -30, t = -30),
                this.finger.pos(this.currMinWeapon[0].x + this.goodsBox.x + e, this.currMinWeapon[0].y + this.goodsBox.y + 63),
                this.finger.visible = !0;
            let s = this.currMinWeapon[1].x + +this.goodsBox.x + t,
                i = this.currMinWeapon[1].y + +this.goodsBox.y + 63;
            this.finger.alpha = 1,
                this.finger_tween = Laya.Tween.to(this.finger, {
                    x: s,
                    y: i
                }, 1e3, null, Laya.Handler.create(this, () => {
                    Laya.Tween.to(this.finger, {
                        alpha: 0
                    }, 500, null, Laya.Handler.create(this, () => {
                        this.complexTip()
                    }))
                }))
        }
    }
    class kt {
        constructor() {}
        static init() {
            var e = Laya.ClassUtils.regClass;
            e("game/GameUIManager.ts", Le),
                e("game/TreasureUIManager.ts", Ce),
                e("human/Player.ts", z),
                e("Loading/LoginScene.ts", xe),
                e("scripts/UI/Slider.ts", Te),
                e("main/MainUIManager.ts", be),
                e("scripts/Localization/LocalizeText.ts", Be),
                e("ScrollBarCrtl.ts", Ee),
                e("zhonggao.ts", Ae),
                e("equit/AirBomb.ts", N),
                e("equit/Air.ts", De),
                e("equit/Bomb.ts", Re),
                e("equit/Bullet.ts", D),
                e("equit/Dog.ts", P),
                e("equit/DropGold.ts", Ge),
                e("eff/DropItem.ts", Pe),
                e("equit/DropSafe.ts", Me),
                e("equit/DropWeapon.ts", Ne),
                e("human/BlasterBoss.ts", Ue),
                e("human/BombSelfMan.ts", F),
                e("human/BunkerBoss.ts", Fe),
                e("human/FlyManEnemy.ts", H),
                e("human/LancerBoss.ts", He),
                e("human/OilDrum.ts", U),
                e("human/RebelBoss.ts", Ke),
                e("human/RugBoss.ts", je),
                e("human/RugWeakness.ts", Q),
                e("human/Enemy.ts", A),
                e("equit/FlyCut.ts", G),
                e("eff/GoldEfff.ts", te),
                e("eff/GoldTip.ts", a),
                e("eff/GoodsItem.ts", Ve),
                e("human/ArmoureEnemy.ts", Ye),
                e("human/SpecialEnemy.ts", qe),
                e("popp/GoldSpeedPopp.ts", Je),
                e("popp/OffLinePopp.ts", $e),
                e("popp/OpenTreasurePopp.ts", et),
                e("game/PauseGamePopp.ts", tt),
                e("popp/ResultPopp.ts", st),
                e("popp/SharePopp.ts", nt),
                e("popp/ShopTreasurePopp.ts", ht),
                e("popp/SignPopp.ts", lt),
                e("util/TextScroll.ts", pt),
                e("popp/SkillLevelUpPopp.ts", ct),
                e("popp/SkillVideoPopp.ts", ut),
                e("popp/SystemManaPopp.ts", mt),
                e("popp/TalentPopp.ts", _t),
                e("popp/WeaponLevelUpPopp.ts", St),
                e("popp/WeaponMaxPopp.ts", bt),
                e("main/WeaponStorePopp.ts", Lt),
                e("equit/Rocket.ts", M),
                e("scripts/Localization/LocalizeImage.ts", vt),
                e("main/KnaspackUIManager.ts", Tt)
        }
    }
    kt.width = 750,
        kt.height = 1334,
        kt.scaleMode = "fixedwidth",
        kt.screenMode = "vertical",
        kt.alignV = "top",
        kt.alignH = "left",
        kt.startScene = "zhonggao.scene",
        kt.sceneRoot = "",
        kt.debug = !1,
        kt.stat = !1,
        kt.physicsDebug = !1,
        kt.exportSceneToJson = !0,
        kt.init();
    class xt {
        static instantiateByPrefab(e, t, s, i, a, n, o = 0, h = 0) {
            if (null == t || void 0 === t.create)
                return;
            let r = Laya.Pool.getItemByCreateFun(e, t.create, t);
            r.name = e,
            s && (s.addChild(r), r.pos(o, h)),
            i && a && (null != n ? (n.push(r), a.call(i, n)) : a.call(i, r))
        }
        static instantiateByUrl(e, t, s, i, a, n = 0, o = 0) {
            if (e) {
                let h = Laya.loader.getRes(e);
                null == h || null == h ? Laya.loader.load(e, Laya.Handler.create(this, this.createInstance, [e, e, t, s, i, a, n, o])) : (null == this.prefab && (this.prefab = new Laya.Prefab), this.prefab.json = h, this.instantiateByPrefab(e, this.prefab, t, s, i, a, n, o))
            }
        }
        static createInstance(e, t, s, i, a, n, o = 0, h = 0) {
            let r = Laya.loader.getRes(t);
            null != r && null != r ? (null == this.prefab && (this.prefab = new Laya.Prefab), this.prefab.json = r, this.instantiateByPrefab(e, this.prefab, s, i, a, n, o, h)) : console.error("无法加载预制体json：" + t)
        }
        static getSprite3d(e, t) {
            let s = Laya.loader.getRes(e);
            return Laya.Sprite3D.instantiate(s, t)
        }
        static getMaterial(e) {
            return Laya.loader.getRes(e)
        }
        static getScene(e) {
            return Laya.loader.getRes(e)
        }
        static getMesh(e) {
            return Laya.loader.getRes(e)
        }
        static getMeshSprite3d(e) {
            return new Laya.MeshSprite3D(this.getMesh(e))
        }
    }
    class Bt extends Xe {
        setData(e) {
            this.ownerSprite.active = !0,
                this.params = e,
            this.initOver && this.initView()
        }
        closeSelf() {
            this.ownerSprite.removeSelf(),
                this.ownerSprite.active = !1,
                _.Dispatch(g.CloseWindow, this)
        }
        onDisable() {
            super.onDisable(),
            this.params && this.params.length > 0 && t.cycleObject(this.params[0], this.owner)
        }
    }
    class Et {
        constructor(e, t, s) {
            this.root = e,
                this.root.mouseThrough = !1,
                this.root.visible = !1,
                this.x = t,
                this.y = s,
                this.addListener()
        }
        addListener() {
            _.AddListener(g.AppendWindows, this, this.onAppendWindows),
                _.AddListener(g.CloseWindow, this, this.onWindowClose)
        }
        onAppendWindows(e) {
            let t = e[0];
            this.page && (this.page.owner.removeSelf(), this.page = null),
            this.root.visible || (this.root.visible = !0),
                xt.instantiateByUrl(t, this.root, this, this.onWindowPageLoaded, e, this.x, this.y)
        }
        onWindowPageLoaded(e) {
            let t = e,
                s = e[e.length - 1].getComponent(Bt);
            s && t && s.setData(t),
                this.page = s
        }
        onWindowClose(e) {
            this.page === e[0] && (this.page = null, this.root.visible = !1)
        }
    }
    !function (e) {
        e.Queue = class {
            constructor() {
                this.count = 0
            }
            push(e) {
                if (void 0 === this.head)
                    this.head = new t(e);
                else if (this.head && void 0 === this.head.next)
                    this.head.next = new t(e), this.tail = this.head.next;
                else {
                    let s = new t(e);
                    this.tail.next = s,
                        this.tail = s
                }
                this.count += 1
            }
            pop() {
                if (0 === this.count)
                    return null;
                if (1 === this.count) {
                    let e = this.head.data;
                    return this.head.clear(),
                        this.head = void 0,
                        this.count--,
                        e
                } {
                    let e = this.head.next,
                        t = this.head.data;
                    return this.head.clear(),
                        this.count--,
                    1 === this.count && (this.tail = void 0),
                        this.head = e,
                        t
                }
            }
            get length() {
                return this.count
            }
        };
        e.Stack = class {
            constructor() {
                this.count = 0,
                    this.count = 0
            }
            push(e) {
                if (void 0 === this.tail)
                    this.tail = new t(e);
                else {
                    let s = new t(e);
                    s.next = this.tail,
                        this.tail = s
                }
                this.count++
            }
            pop() {
                if (0 === this.count)
                    return null;
                if (1 === this.count) {
                    let e = this.tail.data;
                    return this.tail.clear(),
                        this.tail = void 0,
                        this.count--,
                        e
                } {
                    let e = this.tail.next,
                        t = this.tail.data;
                    return this.tail.clear(),
                        this.count--,
                        this.tail = e,
                        t
                }
            }
            peek() {
                return 0 === this.count ? null : null != this.tail ? this.tail.data : void 0
            }
            get length() {
                return this.count
            }
        };
        e.List = class {
            constructor() {
                this.count = 0
            }
            get length() {
                return this.count
            }
            add(e) {
                if (this.tail) {
                    let t = new s(e, this.tail);
                    this.tail.next = t,
                        this.tail = t
                } else if (this.head) {
                    let t = new s(e, this.head);
                    this.head.next = t,
                        this.tail = t
                } else {
                    let t = new s(e);
                    this.head = t
                }
                this.count++
            }
            remove(e) {
                if (this.head) {
                    let t = this.head;
                    do {
                        if (t.data === e) {
                            let e = t.previous,
                                s = t.next;
                            e ? (e.next = s, s && (s.previous = e)) : s ? (this.head = s, this.head.previous = void 0) : this.head = void 0,
                                this.count--,
                            t == this.tail && (this.count <= 1 ? this.tail = void 0 : this.tail = e),
                                t.clear()
                        }
                    } while (t.next)
                }
            }
            removeNode(e) {
                e && (e == this.tail ? e.previous != this.head ? (this.tail = e.previous, e.previous.next = this.tail) : (this.head.next = void 0, this.tail = void 0) : e == this.head ? (this.head = e.next, e.next && (e.next.previous = this.head)) : (e.previous.next = e.next, e.next.previous = e.previous), e.clear())
            }
            removeByIndex(e) {
                if (!(e < 0 || e > this.count - 1)) {
                    let t = 0,
                        s = this.head;
                    do {
                        t == e ? this.removeNode(s) : (t++, s = s.next)
                    } while (s && t <= e)
                }
            }
            get(e) {
                if (e < 0 || e > this.count - 1)
                    return null; {
                    let t = 0,
                        s = this.head;
                    do {
                        if (t == e)
                            return s.data;
                        t++,
                            s = s.next
                    } while (s && t <= e)
                }
            }
            clearAll() {
                if (this.count >= 1) {
                    let e = this.head;
                    do {
                        let t = this.head.next;
                        e.clear(),
                            e = t
                    } while (e)
                }
                this.head = void 0,
                    this.tail = void 0,
                    this.count = 0
            }
            traverse(e, t) {
                if (!this.head)
                    return;
                let s = this.head;
                do {
                    let i = t.call(e, s.data);
                    if (s = s.next, i)
                        return
                } while (s)
            }
        };
        class t {
            constructor(e, t) {
                this.data = e,
                    this.next = t
            }
            clear() {
                this.data = null,
                    this.next = null
            }
        }
        class s {
            constructor(e, t, s) {
                this.data = e,
                    this.previous = t,
                    this.next = s
            }
            clear() {
                this.data = null,
                    this.next = null,
                    this.previous = null
            }
        }
    }
    (ft || (ft = {}));
    class At {
        constructor(e, t, s) {
            this.root = e,
                this.rootZorder = this.root.zOrder,
                this.root.mouseThrough = !1,
                this.root.visible = !1,
                this.createBgBox(),
                this.boxStack = new ft.Stack,
                this.addListener(),
                this.x = t + 375,
                this.y = s + 667
        }
        createBgBox() {
            this.bgBox = new Laya.Image,
                this.root.addChild(this.bgBox),
                this.bgBox.width = this.root.width,
                this.bgBox.height = this.root.height,
                this.bgBox.graphics.drawRect(0, 0, this.bgBox.width, this.bgBox.height, "#000000cc", "#000000cc"),
                this.bgBox.mouseEnabled = !0,
                this.bgBox.mouseThrough = !1
        }
        addListener() {
            _.AddListener(g.AppendBox, this, this.onAppendBox),
                _.AddListener(g.CloseBox, this, this.onBoxClosed)
        }
        onAppendBox(e) {
            let t = e[0];
            t && xt.instantiateByUrl(t, this.root, this, this.onBoxLoaded, e, this.x, this.y)
        }
        onBoxLoaded(e) {
            let t = e,
                s = e[e.length - 1],
                i = s.getComponent(Qe);
            s.pivot(375, 667),
                s.alpha = 1,
                s.scale(1, 1),
            X.Instance.PauseGame || Laya.timer.once(1, this, () => {
                console.log("当前弹窗的参数： " + t),
                    s.alpha = 0,
                    s.scale(.6, .6),
                    Laya.Tween.to(s, {
                        alpha: 1,
                        scaleX: 1,
                        scaleY: 1
                    }, 120)
            }),
            t && i.setData(t),
            this.root.visible || (this.root.visible = !0),
                this.boxStack.push(i),
                this.setZOrder(s)
        }
        setZOrder(e) {
            e && (e.zOrder = this.rootZorder + 2 * this.boxStack.length - 1, this.bgBox.zOrder = e.zOrder - 1)
        }
        closeBox() {
            let e = this.boxStack.pop();
            if (e) {
                e.closeSelf();
                let t = this.boxStack.peek();
                t && this.setZOrder(t.OwnerSprite),
                    this.root.visible = this.boxStack.length > 0
            }
        }
        onBoxClosed(e) {
            let t = e[0],
                s = this.boxStack.peek();
            t && t == s && (s = this.boxStack.pop(), this.setZOrder(s.OwnerSprite)),
                this.root.visible = this.boxStack.length > 0
        }
        judgeBoxExist() {
            return 0 == this.boxStack.length
        }
    }
    class Dt {
        constructor(e) {
            this.startPosy = 0,
                this.tipMsgQueue = new ft.Queue,
                this.root = e,
                this.root.mouseThrough = !0,
                this.createText(),
                this.addEventListener(),
                Laya.timer.loop(100, this, this.showTipMsg)
        }
        createText() {
            let e = new Laya.Text;
            e.fontSize = 50,
                e.color = "#f7cb30",
                e.align = "center",
                e.valign = "middle",
                e.overflow = "visible",
                this.root.addChild(e),
                e.size(this.root.width, this.root.height),
                this.startPosy = -100,
                e.pos(0, this.startPosy),
                this.text = e,
                this.text.text = "",
                this.text.mouseThrough = !0,
                this.text.visible = !1
        }
        resetText() {
            this.text.pos(0, this.startPosy),
                this.text.alpha = 1,
                this.text.visible = !0
        }
        addEventListener() {
            _.AddListener(g.AppendTextTip, this, this.onAppendTextTip)
        }
        onAppendTextTip(e) {
            this.tipMsgQueue.length < 2 && this.tipMsgQueue.push(e)
        }
        showTipMsg() {
            if (!this.text.visible && this.tipMsgQueue.length > 0) {
                let e = this.tipMsgQueue.pop();
                e && (this.root.visible || (this.root.visible = !0), this.resetText(), this.text.text = e[0], this.text.font, Laya.Tween.to(this.text, {
                    y: this.startPosy - 100,
                    alpha: 0
                }, e[1], null, Laya.Handler.create(this, this.onShowMsgComplete)))
            } else
                this.text.visible || 0 !== this.tipMsgQueue.length || (this.root.visible = !1)
        }
        onShowMsgComplete() {
            this.text.visible = !1
        }
    }
    class Rt extends Xe {
        addListener() {
            _.AddListener(g.TriggerShare, this, this.disableMouseClick),
                _.AddListener(g.ShareResult, this, this.enableMouseClick),
                _.AddListener(g.PlayVideoAD, this, this.disableMouseClick),
                _.AddListener(g.VideoADResult, this, this.enableMouseClick),
                _.AddListener(g.NoAdOrShareReady, this, this.enableMouseClick),
                this.owner.on("click", this, () => {
                    this.ownerSprite.visible = !this.ownerSprite.visible
                })
        }
        initView() {
            this.switchMouseThrough(!1)
        }
        removeListener() {
            _.RemoveListener(g.TriggerShare, this, this.disableMouseClick),
                _.RemoveListener(g.ShareResult, this, this.enableMouseClick),
                _.RemoveListener(g.PlayVideoAD, this, this.disableMouseClick),
                _.RemoveListener(g.VideoADResult, this, this.enableMouseClick),
                _.RemoveListener(g.NoAdOrShareReady, this, this.enableMouseClick)
        }
        disableMouseClick() {
            this.switchMouseThrough(!0)
        }
        enableMouseClick() {
            this.switchMouseThrough(!1)
        }
        switchMouseThrough(e) {
            this.ownerSprite.mouseThrough = e,
                this.ownerSprite.visible = e
        }
    }
    class Gt {
        constructor(e) {
            this.root = e,
                this.root.mouseThrough = !1,
                this.root.visible = !1,
                _.AddListener(g.ShowLoading, this, this.onShowLoading),
                _.AddListener(g.CloseLoading, this, this.onCloseLoading)
        }
        createAnim() {
            this.anim = new Laya.Skeleton,
                this.anim.load(this.animPath, Laya.Handler.create(this, () => {
                    this.anim.play(0, !0)
                }))
        }
        onShowLoading() {
            this.anim ? this.anim.play(0, !0) : this.createAnim(),
                this.root.visible = !0
        }
        onCloseLoading() {
            this.anim && this.anim.stop(),
                this.root.visible = !1
        }
    }
    class Pt {
        constructor(e, t, s) {
            this.root = e,
                this.rootZorder = this.root.zOrder,
                this.root.mouseThrough = !0,
                this.addListener(),
                this.x = t,
                this.y = s,
                se.siteX = t,
                se.siteY = s,
                se.parent = e,
                this.root_children = []
        }
        addListener() {
            _.AddListener(g.ShowEff, this, this.showEff),
                _.AddListener(g.AddEff, this, this.addEff),
                _.AddListener(g.HideEff, this, this.hideEff),
                _.AddListener(g.ShowGoldEff, this, this.addGold),
                _.AddListener(g.GetTreasure, this, this.getTreasureWeapon)
        }
        showEff() {
            this.root.visible = !0
        }
        hideEff() {
            for (let e = 0; e < this.root_children.length; e++) {
                const t = this.root_children[e];
                t[1] || t[0].removeSelf()
            }
            this.root_children = []
        }
        addEff(e) {
            this.root.visible = !0,
                this.root.addChild(e[0]);
            let t = [e[0], !1];
            this.root_children.push(t),
                e[0].pos(e[1] + this.x, e[2] + this.y)
        }
        addGold(e) {
            e[1] = e[1] || 1,
                m.Instance.addSignGoldSk(this.root, this.x, this.y, e[0], e[1])
        }
        getEffRoot() {
            return this.root
        }
        getTreasureWeapon(e) {
            let t = this.root_children[e[0]][0];
            this.root_children[e[0]][1] = !0,
                Laya.Tween.to(t, {
                    scaleX: .1,
                    scaleY: .1,
                    y: 1e3 + this.y
                }, 300, null, Laya.Handler.create(this, () => {
                    t.removeSelf()
                }))
        }
    }
    class Mt {
        static init() {
            this.hasInit || this.mainFunSettings()
        }
        static setWorkerState() {
            Laya.WorkerLoader.workerPath = "libs/worker.js",
                Laya.WorkerLoader.enable = !0
        }
        static judgeBoxExist() {
            return this.boxController.judgeBoxExist()
        }
        static setUILayers() {
            if (this.hasInit)
                return;
            let e = Math.floor(Laya.Browser.width),
                t = Math.floor(Laya.Browser.height),
                s = e / t,
                i = kt.width / kt.height,
                a = t / kt.height;
            s > i ? a = t / kt.height : s < i && (a = e / kt.width);
            let n = e / a,
                o = t / a,
                h = (n - kt.width) / 2,
                r = (o - kt.height) / 2;
            Laya.Scene.root.pos(h, r),
                this.bg = new Laya.Image,
                Laya.stage.addChild(this.bg),
                this.bg.skin = this.bgSkin,
                this.bg.sizeGrid = "15,15,15,15";
            let l = kt.width,
                p = kt.height;
            s > i ? p = (l = n) * kt.height / kt.width : s < i && (l = (p = o) * kt.width / kt.height);
            let d = (n - l) / 2,
                c = (o - p) / 2;
            this.bg.name = "backGround",
                this.bg.zOrder = this.bgZorder,
                this.bg.sizeGrid = "15,15,15,15",
                this.bg.size(l, p),
                this.bg.pos(d, c),
                this.posX = h - d,
                this.posY = r - c,
                this.windowRoot = this.createLayerImage(this.windowZorder, "WindowRoot", l, p, d, c),
                this.windowRoot.skin = this.windowRootSkin,
                this.windowsController = new Et(this.windowRoot, this.posX, this.posY);
            let u = this.createLayerImage(this.loadingZorder, "LoadingRoot", l, p, d, c);
            this.loadingViewController = new Gt(u);
            let m = this.createLayerImage(this.boxZorder, "BoxRoot", l, p, d, c);
            this.boxController = new At(m, this.posX, this.posY);
            let g = this.createLayerImage(this.effZorder, "EffRoot", l, p, d, c);
            this.effController = new Pt(g, this.posX, this.posY);
            let _ = this.createLayerImage(this.textTipZorder, "TextTipRoot", l, p, d, c);
            this.textTipController = new Dt(_);
            let f = this.createLayerImage(this.globalMaskZorder, "GlobalMask", n, o, 0, 0);
            this.globalMask = f.addComponent(Rt),
                this.hasInit = !0
        }
        static createLayerImage(e, t, s, i, a, n) {
            let o = new Laya.Image;
            return Laya.stage.addChild(o),
                o.pos(a, n),
                o.size(s, i),
                o.name = t,
                o.zOrder = e,
                o
        }
        static mainFunSettings() {
            window.Laya3D ? Laya3D.init(kt.width, kt.height) : Laya.init(kt.width, kt.height, Laya.WebGL),
                Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO,
                Laya.stage.screenMode = kt.screenMode,
                Laya.stage.alignV = kt.alignV,
                Laya.stage.alignH = kt.alignH,
            Laya.Physics && Laya.Physics.enable(),
            Laya.DebugPanel && Laya.DebugPanel.enable(),
                Laya.URL.exportSceneToJson = kt.exportSceneToJson,
            (kt.debug || "true" == Laya.Utils.getQueryString("debug")) && Laya.enableDebugPanel(),
            kt.physicsDebug && Laya.PhysicsDebugDraw && Laya.PhysicsDebugDraw.enable(),
            kt.stat && Laya.Stat.show(),
                Laya.alertGlobalError = !0,
                this.onVersionLoaded()
        }
        static onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(Mt, this.onConfigLoaded))
        }
        static onConfigLoaded() {
            kt.startScene && this.openScene(kt.startScene)
        }
        static openScene(e, t, s, i) {
            Laya.Scene.open(e, t, s, Laya.Handler.create(Mt, this.setUILayers), i)
        }
        static changeBg(e) {
            this.bg.skin = e
        }
        static changeWindowsBg(e) {
            this.windowRoot.skin = e
        }
        static getEffController() {
            return this.effController
        }
    }
    Mt.hasInit = !1,
        Mt.bgZorder = -10,
        Mt.modelSceneZorder = 0,
        Mt.uiSceneZorder = 100,
        Mt.threedZorder = 200,
        Mt.threedTouchZorder = 300,
        Mt.windowZorder = 400,
        Mt.loadingZorder = 500,
        Mt.boxZorder = 600,
        Mt.effZorder = 650,
        Mt.textTipZorder = 700,
        Mt.globalMaskZorder = 800,
        Mt.bgSkin = "loginScene/company_ani_bg.png",
        Mt.windowRootSkin = "",
        Mt.crtScene = kt.startScene;
    new class {
        constructor() {
            Mt.init()
        }
    }
}
();
