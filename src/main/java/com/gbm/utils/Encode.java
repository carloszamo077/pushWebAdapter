package com.gbm.utils;

import java.util.Base64;

public class Encode {

  /**
   * Encode to Base64.
   * 
   * @param user
   * @param password
   * @return
   */
  public static Object Code(String user, String password) {
    String encoding = Base64.getEncoder().encodeToString((user + ":" + password).getBytes());
    return encoding;
  }
}